import { createContext, useState, useEffect } from 'react';

export const DefaultContext = createContext();
export const DefaultContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(false);
    useEffect(() => {
        fetch('https://ns1.jpruezkiez.com/products')
            .then(res => res.json())
            .then(products => setProducts(products))
    }, []);
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
            loggedInUser,
            setLoggedInUser,
            isLogged, setIsLogged,
        }}>
            {children}
        </DefaultContext.Provider>
    );
};
