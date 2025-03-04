import { MongoClient, ObjectId, Collection } from "mongodb";

export class ImageProvider {
    private imagesCollection: Collection<Image>;
    private usersCollection: Collection<User>;

    constructor(private readonly mongoClient: MongoClient) {
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const usersCollectionName = process.env.USERS_COLLECTION_NAME; // Add users collection name

        if (!imagesCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        if (!usersCollectionName) {
            throw new Error("Missing USERS_COLLECTION_NAME from environment variables");
        }

        this.imagesCollection = this.mongoClient.db().collection<Image>(imagesCollectionName);
        this.usersCollection = this.mongoClient.db().collection<User>(usersCollectionName); // Initialize users collection
    }

    async getAllImages(): Promise<DenormalizedImage[]> {
        const images = await this.imagesCollection.find().toArray();
        const denormalizedImages: DenormalizedImage[] = await Promise.all(
            images.map(async (image) => {
                const user = await this.usersCollection.findOne({ _id: image.author}); // Assuming author is _id
                return {
                    ...image,
                    author: user || { _id: image.author, username: "Unknown", email: "unknown" }, // Fallback if user not found.
                };
            })
        );
        return denormalizedImages;
    }
}

interface Image {
    _id: string;
    src: string;
    name: string;
    author: string; // Now this is the author's _id
    likes: number;
}

interface User {
    _id: string;
    username: string;
    email: string;
}

interface DenormalizedImage extends Omit<Image, "author"> {
    author: User;
}