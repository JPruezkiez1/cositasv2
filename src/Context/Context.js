import { createContext, useState, useEffect } from 'react';

export const DefaultContext = createContext();
export const DefaultContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loginOpen, setOpenLogin] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetch('https://nodejs-dot-strategic-reef-401621.ue.r.appspot.com/products')
            .then(res => res.json())
            .then(products => setProducts(products))
    }, []);

    const openLogin = () => setOpenLogin(true);
    const closeLogin = () => setOpenLogin(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <DefaultContext.Provider value={{
            products,
            setProducts,
            loginOpen,
            openLogin,
            closeLogin,
            handleClose,
            handleOpen,
            open,
        }}>
            {children}
        </DefaultContext.Provider>
    );
};
