import { createContext, useState, useEffect } from 'react';

export const DefaultContext = createContext();
export const DefaultContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loginOpen, setOpenLogin] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetch('https://ns1.jpruezkiez.com/products')
            .then(res => res.json())
            .then(products => setProducts(products))
    }, []);
    const openLogin = () => setOpenLogin(true);
    const closeLogin = () => setOpenLogin(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isLogged, setIsLogged] = useState(() => localStorage.getItem('loggedInUser'));
    useEffect(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setLoggedInUser(user);
            setIsLogged(true);
        }
    }, []);
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
            loggedInUser,
            setLoggedInUser,
            isLogged, setIsLogged
        }}>
            {children}
        </DefaultContext.Provider>
    );
};
