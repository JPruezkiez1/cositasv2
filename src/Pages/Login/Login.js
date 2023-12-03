import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import FieldComponent from '../../Pages/Register/Fiels';
import { DefaultContext } from '../../Context/Context';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
const style = {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
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
        <>

            <Box sx={style}>
                <img style={{ maxWidth: '340px', height: 'auto', width: '100%' }} src="https://awo.jpruezkiez.com/Qib4VT.jpg" />

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
        </>
    );
}