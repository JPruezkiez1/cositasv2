import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import MapComponent from '../Map/Map';
import Container from '../Container/Container';
import Button from '@mui/material/Button';

async function getLoads() {
    const response = await fetch('http://ns1.jpruezkiez.com/loads');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export default function LoadTable() {
    const [loads, setLoads] = useState([]);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getLoads().then(setLoads).catch(setError);
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const columns = [
        { field: 'LoadID', headerName: 'Load ID', width: 150 },
        { field: 'LoadName', headerName: 'Load Name', width: 150 },
        { field: 'TruckType', headerName: 'Truck Type', width: 150 },
        { field: 'Driver', headerName: 'Driver', width: 150 },
        { field: 'Payment', headerName: 'Payment', width: 150 },
        {
            field: 'showDirections',
            headerName: 'Show Directions',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        const load = loads.find((load) => load.LoadID === params.id);
                        setEvents(load.events);
                    }}
                >
                    Show Directions
                </Button>
            ),
        },
    ];

    return (
        <Container>
            <MapComponent events={events} />
            <div style={{ width: '100%', height: '50vh' }}>
                <DataGrid rows={loads} columns={columns} pageSize={5} getRowId={(row) => row.LoadID} />
            </div>
        </Container>
    );
}
