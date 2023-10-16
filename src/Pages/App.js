import Navbar from "../Components/Navbar/Appbar";
import Tester from "../Components/tester";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultContextProvider } from "../Context/Context";
import Store from "./Store/Store";
import Register from "./Register/Register";
import Login from "../Components/Login/Login";
import Gal from "../Utility/ImageCard/Gal";
import TestModal from '../Utility/TesterField/ModalTest'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="/register" element={<Register />} />
      <Route path="/test" element={<Tester />} />
      <Route path="/modal" element={<Login />} />
      <Route path="/tf" element={<Gal />} />
      <Route path="/md" element={<TestModal />} />
    </Routes>
  );
};

function App() {
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
