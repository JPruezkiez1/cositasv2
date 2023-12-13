import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import EventMaker from '../../Components/EventMaker/EventMaker';
import Container from '../../Components/Container/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const LoadCreator = () => {
    const [load, setLoad] = useState({
        LoadName: '',
        TruckType: '',
        Payment: '',
        Driver: '',
        Rate_Confirmation: '',
        Truck_VIN: '',
        Dispatcher: ''
    });

    const [events, setEvents] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);

    const handleChange = (e) => {
        setLoad({ ...load, [e.target.name]: e.target.value });
    };

    const handleAddEvent = () => {
        setEvents([...events, {}]);
        setEditingEventId(events.length);
    };

    const handleSaveEvent = (updatedEvent) => {
        const newEvents = [...events];
        newEvents[editingEventId] = updatedEvent;
        setEvents(newEvents);
        setEditingEventId(null);
    };

    const handleEditEvent = (index) => {
        setEditingEventId(index);
    };

    const handleRemoveEvent = (index) => {
        const newEvents = [...events];
        newEvents.splice(index, 1);
        setEvents(newEvents.map((event, index) => ({ ...event, CallOrder: index + 1 })));
    };

    const handleCreateLoad = async () => {
        const hasPickup = events.some(event => event.EventType === 'PICKUP');
        const hasDropOff = events.some(event => event.EventType === 'DROP-OFF');

        if (!hasPickup || !hasDropOff) {
            alert('Please add at least one pickup event and one drop-off event before creating the load.');
            return;
        }

        const payload = {
            load: load,
            events: events
        };

        try {
            const response = await fetch('https://ns1.jpruezkiez.com/createload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            console.log('Response:', response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API error:', errorText);
                throw new Error(`API error: ${errorText}`);
            }

            console.log('API response:', await response.json());
        } catch (error) {
            console.error('Failed to create load:', error.message);
        }
    };


    const matches = useMediaQuery('(max-width:450px)');

    const TexfieldPhone = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        width: matches ? '180px' : '230px',
                    },
                },
            },
        },
    });
    return (
        <Container>
            <ThemeProvider theme={TexfieldPhone}>
                <Box sx={{
                    overflow: 'auto',
                }}
                >
                    <Typography variant="h5">Create Load</Typography>
                    <Box sx={{ gap: '5px', display: 'flex', flexWrap: 'wrap' }}>
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
                            inputProps={{
                                min: 0,
                                step: 0.01,
                                maxLength: 6
                            }}
                            required
                            value={load.Payment}
                            onChange={handleChange}

                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
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
                    <Box sx={{ overflow: 'hidden', }}>
                        {events.map((event, index) => (
                            <EventMaker
                                key={index}
                                event={event}
                                isEditing={index === editingEventId}
                                onSave={(updatedEvent) => handleSaveEvent(updatedEvent)}
                                onEdit={() => handleEditEvent(index)}
                                onRemove={() => handleRemoveEvent(index)}
                                callOrder={index + 1}
                            />
                        ))}
                        <Button onClick={handleAddEvent}>Add Stop</Button>
                        <Button onClick={handleCreateLoad}>Create Load</Button>
                    </Box>
                </Box>
            </ThemeProvider>
        </Container>
    );
};

export default LoadCreator;
