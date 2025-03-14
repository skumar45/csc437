import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
import { ImageProvider } from "./ImageProvider";
import {registerImageRoutes} from "./routes/images"


dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.

const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
const app = express();

app.use(express.json());
app.use(express.static(staticDir));

async function setUpServer() {
    try {
        const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME, IMAGES_COLLECTION_NAME } = process.env;
        
       
        const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:410gI40RRW0U2v9l@${MONGO_CLUSTER}/${DB_NAME}`;
        const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

        console.log("Attempting Mongo connection at " + connectionStringRedacted);
      

       
        const mongoClient = await MongoClient.connect(connectionString);
        /*const collectionInfos = await mongoClient.db().listCollections().toArray();
        console.log("Collections:", collectionInfos.map(info => info.name));*/
        registerImageRoutes(app, mongoClient);
       
        app.get("/hello", (req: Request, res: Response) => {
            res.send("Hello, World");
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

//sendFile("index.html, {root: staticDir}}")
//left on add an update API step