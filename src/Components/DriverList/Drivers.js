import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Container from '../Container/Container'
import { Button } from "@mui/material";
async function getDrivers() {
    const response = await fetch('https://tms.jpruezkiez.com/driver');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export default function DriversTable() {
    const [drivers, setDrivers] = useState([])
    const [error, setError] = useState(null);
    const [selectdriver, setSelectDriver] = useState(null)
    useEffect(() => {
        getDrivers().then(setDrivers).catch(setError);
    }, [])

    const filterDrivers = () => {
        return drivers.filter(driver => driver.active === 1);
    };

    const filteredDrivers = filterDrivers();
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(selectdriver)
    const columns = [
        { field: 'id', headerName: 'id', width: 150 },
        { field: 'first_name', headerName: 'First Name', width: 150 },
        { field: 'carrier_name', headerName: 'Company', width: 150 },
        {
            field: 'Select',
            headerName: 'Select Driver',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setSelectDriver(params.row);
                    }}
                >
                    Show information
                </Button>
            ),
        }
    ]





    return (
        <Container>
            <div style={{ width: '100%' }}>
                <DataGrid rows={filteredDrivers} columns={columns} pageSize={5} getRowId={(row) => row.id} />
            </div>
        </Container>
    );
}
