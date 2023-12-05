import './Navbar.css';
import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { DefaultContext } from '../../Context/Context';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import { Link } from 'react-router-dom';
import TestModal from '../Modal/ModalTest';
import { ModalContext } from '../../Context/MContext';
import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';
function Navbar() {
    const { openLogin, registerO, openRegister, closeRegister, loginOpen, closeLogin } = useContext(ModalContext);
    const { isLogged, loggedInUser, setIsLogged } = useContext(DefaultContext);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setIsLogged(false);
    };
    return (
        <>
            <nav className="navbar">
                <ul className='nav-links'>
                    <div className='icon_01'><Link to='/' ><StarBorderPurple500OutlinedIcon className='icon_02' sx={{ width: '45px', height: '45px' }}></StarBorderPurple500OutlinedIcon></Link></div>
                    <div className='links_01'>
                        {isLogged && <li style={{ cursor: 'pointer' }} >Chocolates</li>}
                    </div>
                    {isLogged && <Avatar alt={loggedInUser.firstName} src={loggedInUser.image} />}
                </ul>
                <ul className='nav-links'>
                    {!isLogged && <li style={{ cursor: 'pointer' }} onClick={openLogin}>Login</li>}
                    {!isLogged && <li style={{ cursor: 'pointer' }} onClick={openRegister} >Register</li>}
                    {isLogged && <li onClick={handleLogout}>Logout</li>}
                </ul>
            </nav>
            <TestModal content={<Login></Login>} open={loginOpen} handleClose={closeLogin} />
            <TestModal content={<Register></Register>} open={registerO} handleClose={closeRegister} />
        </>
    );
}

export default Navbar;
