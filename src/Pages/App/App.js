import Navbar from "../../Components/Navbar/Appbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultContextProvider } from "../../Context/Context";
import Store from "../Store/Store";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { AuthRoutes } from "../../Utility/Routes/Preventor";
import { ModalContextProvider } from "../../Context/MContext";
import GalleryView from "../../Utility/ImageCard/Gal";
import DataTable from "../FileManager/Files";
import FileUploader from "../FileUpload/FileUploader";
import Users from "../UserManagement/Users";
import LoadPages from "../LoadsPage/Loadspage";
import LoadCreator from "../Create-Loads/LoadCreator";
import DriversTable from "../../Components/DriverList/Drivers";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoadPages />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<AuthRoutes><Login /></AuthRoutes>} />
      <Route path="/store" element={<Store />} />
      <Route path="/gv" element={<GalleryView />} />
      <Route path="/files" element={<DataTable />} />
      <Route path="/uploader" element={<FileUploader />} />
      <Route path="/users" element={<Users />} />
      <Route path="/shipments" element={<LoadPages />} />
      <Route path="/newshipment" element={<LoadCreator />} />
      <Route path="/drivers" element={<DriversTable />} />
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
