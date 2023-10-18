import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const DefaultContext = createContext();

export const DefaultContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [isLogged, setIsLogged] = useState(() => localStorage.getItem('loggedInUser'));
    const [maxPage, setMaxPage] = useState(2);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageNumber = parseInt(query.get('p')) || 1;

    useEffect(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setLoggedInUser(user);
            setIsLogged(true);
        }
    }, []);
    useEffect(() => {
        fetch(`https://ns1.jpruezkiez.com/products?page=${pageNumber}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, [pageNumber]);

    return (
        <DefaultContext.Provider value={{
            products,
            setProducts,
            loggedInUser,
            setLoggedInUser,
            isLogged,
            setIsLogged,
            pageNumber,
            maxPage,
            setMaxPage
        }}>
            {children}
        </DefaultContext.Provider>
    );
};
