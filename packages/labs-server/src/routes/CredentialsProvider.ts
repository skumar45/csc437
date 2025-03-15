import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";

interface ICredentialsDocument {
    username: string;
    password: string;
}

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;
    private readonly SALT_ROUNDS = 10;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string): Promise<boolean> {
        try {
            // Check if the username already exists
            const existingUser = await this.collection.findOne({ username });
            if (existingUser) {
                return false; // User already exists
            }

            // Generate salt and hash password
            const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

            // Debugging: Log salt and hash (remove in production)
            console.log("Salt:", salt);
            console.log("Hash:", hashedPassword);

            // Store credentials in MongoDB
            await this.collection.insertOne({
                username,
                password: hashedPassword, // Store only the hashed password
            });

            return true; // Registration successful
        } catch (error) {
            console.error("Error registering user:", error);
            return false; // Return false if any error occurs
        }
    }

    async verifyPassword(username: string, plaintextPassword: string): Promise<boolean>{
        try {
            // Fetch user from database
            const user = await this.collection.findOne({ username });
            if (!user) {
                return false; // User does not exist
            }

            return await bcrypt.compare(plaintextPassword, user.password);
        } catch (error) {
            console.error("Error verifying password:", error);
            return false; // Return false on error
        }
    }
}
