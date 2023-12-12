import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import EventMaker from './EventMaker';

const LoadCreator = () => {
    const [load, setLoad] = useState({
        LoadID: '',
        LoadName: '',
        TruckType: '',
        Payment: '',
        Driver: '',
        Rate_Confirmation: '',
        Truck_VIN: '',
        Dispatcher: '',
        events: []
    });

    const [events, setEvents] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);

    const handleChange = (e) => {
        setLoad({ ...load, [e.target.name]: e.target.value });
    };

    const handleAddEvent = () => {
        setEvents([...events, { id: Date.now() }]);
        setEditingEventId(Date.now());
    };

    const handleSaveEvent = (id, updatedEvent) => {
        setEvents(events.map(event => event.id === id ? updatedEvent : event));
        setEditingEventId(null);
    };

    const handleEditEvent = (id) => {
        setEditingEventId(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!load.LoadName || !load.TruckType || !load.Payment || !load.Driver) {
            alert('Please fill in all required fields');
            return;
        }

        console.log('Load data submitted:', load);
    };

    return (
        <Box>
            <Typography variant="h5">Create Load</Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                <TextField
                    id="LoadID"
                    name="LoadID"
                    label="Load ID"
                    variant="outlined"
                    value={load.LoadID}
                    onChange={handleChange}
                />
                <TextField
                    id="LoadName"
                    name="LoadName"
                    label="Load Name"
                    variant="outlined"
                    required
                    value={load.LoadName}
                    onChange={handleChange}
                />
                <TextField
                    id="TruckType"
                    name="TruckType"
                    label="Truck Type"
                    variant="outlined"
                    required
                    value={load.TruckType}
                    onChange={handleChange}
                />
                <TextField
                    id="Payment"
                    name="Payment"
                    label="Payment"
                    variant="outlined"
                    required
                    value={load.Payment}
                    onChange={handleChange}
                />
                <TextField
                    id="Driver"
                    name="Driver"
                    label="Driver"
                    variant="outlined"
                    required
                    value={load.Driver}
                    onChange={handleChange}
                />
                <TextField
                    id="Rate_Confirmation"
                    name="Rate_Confirmation"
                    label="Rate Confirmation"
                    variant="outlined"
                    value={load.Rate_Confirmation}
                    onChange={handleChange}
                />
                <TextField
                    id="Truck_VIN"
                    name="Truck_VIN"
                    label="Truck VIN"
                    variant="outlined"
                    value={load.Truck_VIN}
                    onChange={handleChange}
                />
                <TextField
                    id="Dispatcher"
                    name="Dispatcher"
                    label="Dispatcher"
                    variant="outlined"
                    value={load.Dispatcher}
                    onChange={handleChange}
                />
            </Box>
            <Box>
                {events.map((event) => (
                    <EventMaker
                        key={event.id}
                        event={event}
                        isEditing={event.id === editingEventId}
                        onSave={handleSaveEvent}
                        onEdit={handleEditEvent}
                    />
                ))}
                <Button onClick={handleAddEvent}>Add Stop</Button>
            </Box>
        </Box>
    );
};

export default LoadCreator;
