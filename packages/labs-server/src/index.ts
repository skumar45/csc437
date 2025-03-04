import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
import { ImageProvider } from "./ImageProvider";


dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.

const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
const app = express();

app.use(express.static(staticDir));

async function setUpServer() {
    try {
        const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME, IMAGES_COLLECTION_NAME } = process.env;
        
       
        const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
        const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

        console.log("Attempting Mongo connection at " + connectionStringRedacted);
      

       
        const mongoClient = await MongoClient.connect(connectionString);
        /*const collectionInfos = await mongoClient.db().listCollections().toArray();
        console.log("Collections:", collectionInfos.map(info => info.name));*/

        const imageProvider = new ImageProvider(mongoClient);

        app.get("/hello", (req: Request, res: Response) => {
            res.send("Hello, World");
        });

        app.get("/api/images", async (req: Request, res: Response) => {
            try {
                const images = await imageProvider.getAllImages();
                res.json(images); // Send JSON response with image data
            } catch (error) {
                console.error("Error fetching images:", error);
                res.status(500).json({ error: "Could not fetch images" });
            }
        });

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error setting up server:", error);
    }
}

// Call the async function to start everything
setUpServer();