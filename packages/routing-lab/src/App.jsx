import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import {useState} from "react";
import { MainLayout } from "./MainLayout";
import { useImageFetching } from "./images/useImageFetching";
import { RegisterPage } from "./auth/RegisterPage.jsx";
import { LoginPage } from "./auth/LoginPage.jsx";

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
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;