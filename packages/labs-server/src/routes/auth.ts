import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { CredentialsProvider } from "./CredentialsProvider";
import jwt from "jsonwebtoken";


const secretKey = process.env.JWT_SECRET as string;
if (!secretKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token>". Discard the "Bearer" part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end(); // 401 Unauthorized
    } else {

    jwt.verify(token, secretKey, (error, decoded) => {
        if (decoded) {
            next(); // Continue to the next middleware or route handler
        } else {
            res.status(403).end(); // 403 Forbidden
        }
    });}
}

function generateAuthToken(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            secretKey,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}


export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    const credentialsProvider = new CredentialsProvider(mongoClient);

    app.post("/auth/register", async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
               res.status(400).json({ 
                error: "Bad request",
                message: "Missing username or password" 
            });
            }

            
            const success = await credentialsProvider.registerUser(username, password);

            if (!success) {
               res.status(400).json({ 
                error: "User already exists",
                message: "Username already taken"
            });
            }

            res.status(201).end();
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.post("/auth/login", async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
    
            if (!username || !password) {
                 res.status(400).json({ error: "Missing username or password" });
            }
    
            const token = await generateAuthToken(username);

            res.send({ token });
        } catch (error) {
            console.error("Error processing login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}