import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import {useState} from "react";
import { MainLayout } from "./MainLayout";
import { useImageFetching } from "./images/useImageFetching";

function App() {
    const [userName, setUserName] = useState("John Doe");
    const { isLoading, fetchedImages } = useImageFetching("");
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<Homepage userName={userName} />} />
                    <Route path="/account" element={<AccountSettings userName={userName} setUserName={setUserName} />} />
                    <Route path="/images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} /> }/>
                    <Route path="/images/:imageID" element={<ImageDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;