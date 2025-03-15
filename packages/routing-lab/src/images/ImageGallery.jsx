import { MainLayout } from "../MainLayout.jsx";
import { useImageFetching } from "./useImageFetching.js";
import "./ImageGallery.css";
import {Link} from "react-router";
import { useEffect } from "react";


export function ImageGallery({isLoading, fetchedImages, fetchImages}) {
    useEffect(() => {
        fetchImages();
    }, []);
    const imageElements = fetchedImages.map((image) => (
        <div key={image.id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image.id}>
                <img src={image.src} alt={image.name}/>
                <p>{image.name}</p>
            </Link>
        </div>
    ));
    return (
        <div>
            <h2>Image Gallery</h2>
            {isLoading && "Loading..."}
            <div className="ImageGallery">
                {imageElements}
            </div>
        </div>
    );
}
