import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { MainLayout } from "./MainLayout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/gallery" element={<ImageGallery />} />
          <Route path="/images" element={<ImageDetails />} />
          <Route path="/settings" element={<AccountSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;