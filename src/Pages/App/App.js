import Navbar from "../../Components/Navbar/Appbar";
import Tester from "../FileUpload/tester";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultContextProvider } from "../../Context/Context";
import Store from "../Store/Store";
import Register from "../Register/Register";
import Login from "../../Components/Login/Login";
import Gal from "../../Utility/ImageCard/Gal";
import { AuthRoutes } from "../../Utility/Routes/Preventor";
import ProtectedRoute from "../../Utility/Routes/Preventor";
import { ModalContextProvider } from "../../Context/MContext";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Tester />} />
      <Route path="/login" element={<AuthRoutes><Login /></AuthRoutes>} />
      <Route path="/tf" element={<Gal />} />
    </Routes>
  );
};

function App() {
  window.onunhandledrejection = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <ModalContextProvider>
        <DefaultContextProvider>
          <BrowserRouter>
            <Navbar />
            <Login />
            <AppRoutes />
          </BrowserRouter>
        </DefaultContextProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
