import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Users() {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://ns1.jpruezkiez.com/users');
                setRows(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://ns1.jpruezkiez.com/userdelete/${id}`);
            setRows(rows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'sex', headerName: 'Sex', width: 70 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'password', headerName: 'Password', width: 130 },
        { field: 'country', headerName: 'Country', width: 130 },
        { field: 'birthDate', headerName: 'Birth Date', width: 130 },
        {
            field: 'image',
            headerName: 'Image',
            sortable: false,
            disableColumnMenu: true,
            width: 100,
            renderCell: (params) => (
                <img src={params.value} alt="User" style={{ width: '50px', height: '50px' }} />
            ),
        },
        { field: 'status', headerName: 'Status', width: 70 },
        {
            field: 'delete',
            headerName: 'Delete User',
            width: 150,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button variant="contained" color="secondary" onClick={() => deleteUser(params.row.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}
