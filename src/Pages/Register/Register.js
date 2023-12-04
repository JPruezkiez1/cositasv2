import React, { useState } from 'react';
import Box from '@mui/material/Box';
import './Register.css'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import FieldComponent from './Fiels';
const countries = [
    { value: 1, label: 'United States' },
    { value: 2, label: 'Canada' },
    { value: 3, label: 'United Kingdom' },
    { value: 4, label: 'Australia' },
    { value: 5, label: 'Germany' },
    { value: 6, label: 'France' },
    { value: 7, label: 'Japan' },
    { value: 8, label: 'China' },
    { value: 9, label: 'India' },
    { value: 10, label: 'Brazil' },
    { value: 11, label: 'Mexico' },
    { value: 12, label: 'South Korea' },
    { value: 13, label: 'Russia' },
    { value: 14, label: 'Italy' },
    { value: 15, label: 'Spain' },
    { value: 16, label: 'Netherlands' },
    { value: 17, label: 'Sweden' },
    { value: 19, label: 'Singapore' },
    { value: 20, label: 'New Zealand' },
];
const rfields = [
    {
        label: 'Username',
        type: 'text',
    },
    {
        label: 'Password',
        type: 'password',
    },
    {
        label: 'Birthday',
        type: 'date',
        defaultValue: '1998-11-18',
    },
    {
        label: 'Email',
        type: 'email',
        placeholder: 'ur sexy name here'
    },
    {
        label: 'FirstName',
        type: 'text',
    },
    {
        label: 'LastName',
        type: 'text',
    },
    {
        label: 'Country',
        type: 'select',
        options: countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
                {country.label}
            </MenuItem>
        )),
    },
    {
        label: 'Sex',
        type: 'select',
        options: [
            <MenuItem key="male" value="M">
                Male
            </MenuItem>,
            <MenuItem key="female" value="F">
                Female
            </MenuItem>,
        ],
    },

];
const Connection = 'https://ns1.jpruezkiez.com/add-customer';

export default function Register() {
    const [formValues, setFormValues] = useState({});
    const PostUser = () => {
        const requestData = {
            first_name: formValues['FirstName'] || '',
            last_name: formValues['LastName'] || '',
            country_id: formValues['Country'] || 1,
            username: formValues['Username'] || '',
            password: formValues['Password'] || '',
            email: formValues['Email'] || '',
            birthdate: formValues['Birthday'] || '',
            sex: formValues['Sex'] || '',
            image: 'n/a',
        };
        axios
            .post(Connection, requestData)
            .then((response) => {

            })
            .catch((error) => {
                console.error('Error registering user:', error);
            });
    };

    return (

        <Box
            sx={{

                display: 'flex',
            }}>
            <img style={{ maxWidth: '340px', height: 'auto', width: '100%' }} src="https://awo.jpruezkiez.com/Qib4VT.jpg" />

            <Box sx={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        display: 'flex',
                        height: 290,
                        textAlign: 'center',
                        width: 550,
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <FieldComponent rfields={rfields} formValues={formValues} setFormValues={setFormValues} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',

                }}>
                    <Button onClick={PostUser} sx={{ background: 'purple' }} variant="contained">Register</Button>
                </Box>
            </Box>
        </Box>
    )



}