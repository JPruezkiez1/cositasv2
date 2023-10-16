import Container from '../../Components/Container/Container'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import './Register.css'
import photo from './awoo.jpg'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { TextField } from '@mui/material';
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
    },
    {
        label: 'Email',
        type: 'email',
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
const Connection = 'https://nodejs-dot-strategic-reef-401621.ue.r.appspot.com/add-customer';

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
            image: 'https://us.rule34.xxx//images/5352/5595d1b5be326901708b21d914ef1454.jpeg?6097844',
        };
        axios
            .post(Connection, requestData)
            .then((response) => {
                console.log('User registered:', response.data);
            })
            .catch((error) => {
                console.error('Error registering user:', error);
            });
    };
    const logFormValues = () => {
        console.log('Form Values:', formValues);
    };
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex'
                }}>
                <img className='img_class' src={photo} />
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
                        <Button onClick={logFormValues} sx={{ background: 'purple' }} variant="contained">Register</Button>
                    </Box>
                </Box>
            </Box>

        </Container >
    )



}