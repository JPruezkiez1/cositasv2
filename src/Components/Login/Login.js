import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import FieldComponent from '../../Pages/Register/Fiels';
import { DefaultContext } from '../../Context/Context';
import { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
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
    boxShadow: 24,
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
    const { loginOpen, closeLogin } = useContext(DefaultContext);
    const [formValues, setFormValues] = useState({});

    const handleLogin = () => {
        axios.post('https://ns1.jpruezkiez.com/', {
            username: formValues.Username,
            password: formValues.Password,
        })
            .then(response => {
                console.log('Login response:', response);
            })
            .catch(error => {
                console.error('Error during login:', error);
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
                <img width='340px' height='100%' src="http://awo.jpruezkiez.com/Qib4VT.jpg" />
                <Box sx={{ width: 240, display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', gap: '5px', padding: '10px', '& .MuiTextField-root': { m: 1, } }}>
                    <FieldComponent sx={{ display: 'flex', }} rfields={rfields} formValues={formValues} setFormValues={setFormValues} />
                    <Button onClick={handleLogin} sx={{ width: 75, background: 'purple' }} variant="contained">Login</Button>
                </Box>
            </Box>
        </Modal>
    );
}
