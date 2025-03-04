import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;

const staticDir = process.env.STATIC_DIR || "public";
const app = express();

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("*", (req: Request, res: Response) => {
    console.log("none of the routes above me were matched");


    const filePath = path.resolve('/Users/saiyushikumar/Desktop/csc437/packages/routing-lab/dist', 'index.html');

   
    res.sendFile(filePath, (err: any) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(err.status || 500).send(err.message);  // Use 500 if no status is available
        } else {
            console.log("Sent:", filePath);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
