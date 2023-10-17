import './Navbar.css';
import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { DefaultContext } from '../../Context/Context';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import { Link } from 'react-router-dom';
function Navbar() {
    const { isLogged, openLogin, loggedInUser, setIsLogged } = useContext(DefaultContext);
    const handleLoginClick = () => {
        openLogin();
    };
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
                        <li>Chocolates</li>
                        <li>Sour</li>
                        <li>Users</li>
                    </div>
                    {isLogged && <Avatar alt={loggedInUser.firstName} src={loggedInUser.image} />}
                </ul>
                <ul className='nav-links'>
                    {!isLogged && <li onClick={handleLoginClick}>Login</li>}
                    {!isLogged && <li>Register</li>}
                    {isLogged && <li onClick={handleLogout}>Logout</li>}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
