import { MainLayout } from "./MainLayout.jsx";
import { useState, useEffect } from "react";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageEditForm } from "./images/ImageEditForm.jsx";

export function Homepage({userName}) {
    return (
        <div>
            <h2>Welcome, {userName}</h2>
            <p>This is the content of the home page.</p>
            <ImageEditForm/>
        </div>
    );
}
