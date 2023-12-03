import { createContext, useState } from 'react';
export const ModalContext = createContext();
export const ModalContextProvider = ({ children }) => {

    const [loginOpen, setOpenLogin] = useState(false);
    const openLogin = () => setOpenLogin(true);
    const closeLogin = () => setOpenLogin(false);


    const [registerO, setRegister] = useState(false);
    const openRegister = () => setRegister(true);
    const closeRegister = () => setRegister(false);



    const [openP, setOpenP] = useState(false);
    const openproduct = () => setOpenP(true);
    const closeproduct = () => setOpenP(false);

    const [checkimg, setCheckimg] = useState(false);
    const openimg = () => setCheckimg(true);
    const closeimg = () => setCheckimg(false);


    return (
        <ModalContext.Provider
            value={{
                loginOpen,
                setOpenLogin,
                openLogin,
                closeLogin,
                registerO,
                setRegister,
                closeRegister,
                openRegister,
                openP,
                setOpenP,
                closeproduct,
                openproduct,
                checkimg,
                setCheckimg,
                openimg,
                closeimg,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};