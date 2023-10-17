import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FieldComponent from '../../Pages/Register/Fiels';
import { DefaultContext } from '../../Context/Context';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { ModalContext } from '../../Context/MContext';
const style = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '3px solid purple',
    display: 'flex',
    boxShadow: '2px 2px 45px 2px purple',
    borderRadius: 15,
    p: 3,
};
const rfields = [
    {
        label: 'Username',
        type: 'text',
    },
    {
        label: 'Password',
        type: 'password',
    },
];
export default function Login() {
    const { loginOpen, closeLogin } = useContext(ModalContext);
    const { setLoggedInUser } = useContext(DefaultContext);
    const [formValues, setFormValues] = useState({});
    const [error, setError] = useState(null);

    const handleLogin = () => {
        axios
            .post('https://ns1.jpruezkiez.com/login', {
                username: formValues.Username,
                password: formValues.Password,
            })
            .then(response => {
                const { loggedInUser } = response.data;
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                setLoggedInUser(loggedInUser);
                window.location.href = '/';
            })
            .catch(error => {
                const errorMessage = error.response?.data?.error || 'Error during login. Please try again later.';
                setError(errorMessage);
            });
    };

    return (
        <Modal
            sx={{
                '& .MuiDialog-container': {
                    outline: 'none',
                },
            }}
            open={loginOpen}
            onClose={closeLogin}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <img width="340px" height="100%" src="https://awo.jpruezkiez.com/Qib4VT.jpg" />
                <Box
                    sx={{
                        width: 240,
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '10px',
                        '& .MuiTextField-root': { m: 1 },
                    }}
                >
                    <FieldComponent
                        sx={{ display: 'flex' }}
                        rfields={rfields}
                        formValues={formValues}
                        setFormValues={setFormValues}
                    />
                    <Button
                        onClick={handleLogin}
                        sx={{ width: 75, background: 'purple' }}
                        variant="contained"
                    >
                        Login
                    </Button>
                    {error && (
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}
