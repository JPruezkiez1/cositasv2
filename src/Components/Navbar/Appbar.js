import './Navbar.css';
import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { DefaultContext } from '../../Context/Context';
import BasicModal from '../Login/Login';


function Navbar() {
    const { openLogin } = useContext(DefaultContext);

    const handleLoginClick = () => {
        openLogin();
    };

    return (
        <>
            <nav className="navbar">
                <ul className='nav-links'>
                    <li>Chocolates</li>
                    <li>Sour</li>
                    <li>Users</li>
                    <Avatar alt="Remy Sharp" src="https://us.rule34.xxx//images/5352/5595d1b5be326901708b21d914ef1454.jpeg?6097844" />
                </ul>
                <ul className='nav-links'>
                    <li onClick={handleLoginClick}>Login</li>
                    <li>Register</li>
                </ul>
            </nav>

        </>
    );
}

export default Navbar;
