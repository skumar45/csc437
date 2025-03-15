import { MainLayout } from "../MainLayout.jsx";
import { useImageFetching } from "./useImageFetching.js";
import { useParams } from "react-router"; 

export function ImageDetails() {
    const { imageID } = useParams();
  
    const { isLoading, fetchedImages } = useImageFetching();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    const imageData = fetchedImages.find(image => image.id === imageID);
    if (!imageData) {
        return <h2>Image not found</h2>;
    }

    return (
        <div>
            <h2>{imageData.name}</h2>
            <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
        </div>
    );
}
