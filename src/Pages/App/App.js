import Navbar from "../../Components/Navbar/Appbar";
import FileUploadComponent from "../FileUpload/tester";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultContextProvider } from "../../Context/Context";
import Store from "../Store/Store";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Gal from "../../Utility/ImageCard/Gal";
import { AuthRoutes } from "../../Utility/Routes/Preventor";
import { ModalContextProvider } from "../../Context/MContext";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<FileUploadComponent />} />
      <Route path="/login" element={<AuthRoutes><Login /></AuthRoutes>} />
      <Route path="/tf" element={<Gal />} />
      <Route path="/store" element={<Store />} />
    </Routes>
  );
};

function App() {
  window.onunhandledrejection = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <BrowserRouter>
        <ModalContextProvider>
          <DefaultContextProvider>
            <Navbar />
            <AppRoutes />
          </DefaultContextProvider>
        </ModalContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
