import Navbar from "../Components/Navbar/Appbar";
import Tester from "./FileUpload/tester";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultContextProvider } from "../Context/Context";
import Store from "./Store/Store";
import Register from "./Register/Register";
import Login from "../Components/Login/Login";
import Gal from "../Utility/ImageCard/Gal";
import TestModal from '../Utility/TesterField/ModalTest'
import { AuthRoutes } from "../Utility/Routes/Preventor";
import ProtectedRoute from "../Utility/Routes/Preventor";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Tester />} />
      <Route path="/login" element={<AuthRoutes><Login /></AuthRoutes>} />
      <Route path="/tf" element={<Gal />} />
      <Route path="/md" element={<TestModal />} />
    </Routes>
  );
};

function App() {
  window.onunhandledrejection = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <DefaultContextProvider>
        <BrowserRouter>
          <Navbar />
          <Login />
          <AppRoutes />
        </BrowserRouter>
      </DefaultContextProvider>
    </>
  );
}

export default App;
