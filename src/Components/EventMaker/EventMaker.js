import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import './Styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: '120px',
                },
            },
        },
    },
});


const EventMaker = ({ event, isEditing, onSave, onEdit, onRemove, callOrder }) => {
    const [localEvent, setLocalEvent] = useState({ ...event, EventType: event?.EventType || '' });
    useEffect(() => {
        setLocalEvent((prevEvent) => ({
            ...prevEvent,
            EventType: prevEvent.EventType || ''
        }));
    }, [event, callOrder]);

    const handleChange = (e) => {
        setLocalEvent({ ...localEvent, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!localEvent.EventType) {
            alert('Please select an Event Type before saving.');
            return;
        }

        onSave(localEvent);
    };

    const handleEdit = () => {
        onEdit();
    };

    const handleRemove = () => {
        onRemove();
    };


    // const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const ematches = useMediaQuery(('(max-width:870px)'));
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ overflow: 'auto' }}>
                <Typography variant="h5">Create Event</Typography>
                {isEditing ? (
                    <Box sx={{ gap: '5px', display: 'flex', flexWrap: 'wrap', }} >
                        <TextField
                            id="event-type"
                            select
                            label="Event Type"
                            name="EventType"
                            required
                            value={localEvent.EventType}
                            onChange={handleChange}
                        >
                            <MenuItem value={"PICKUP"}>PICKUP</MenuItem>
                            <MenuItem value={"DROP-OFF"}>DROP-OFF</MenuItem>
                        </TextField>
                        <TextField required inputProps={{
                            min: 0,
                            maxLength: 6
                        }} name="Weight" label="Weight" onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }} value={localEvent.Weight} onChange={handleChange} />
                        <TextField required name="Address" label="Address" value={localEvent.Address} onChange={handleChange} />
                        <TextField required name="State" label="State" value={localEvent.State} onChange={handleChange} />
                        <TextField required name="Country" label="Country" value={localEvent.Country} onChange={handleChange} />
                        <TextField required name="City" label="City" value={localEvent.City} onChange={handleChange} />
                        <TextField
                            select
                            required
                            label="Status"
                            name="Status"
                            value={localEvent.Status}
                            onChange={handleChange}
                        >
                            <MenuItem value={"PENDING"}>PENDING</MenuItem>
                            <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                            <MenuItem value={"COMPLETED"}>Completed</MenuItem>
                        </TextField>
                        <Button onClick={handleSave}>Save</Button>
                    </Box>
                ) :
                    (
                        <Box
                            sx={{
                                gap: '10px',
                                display: 'flex',
                                flexDirection: ematches ? 'column' : 'row',
                                alignItems: 'center',
                                borderRadius: 2,
                                justifyContent: 'space-between',
                                border: '1px solid black',
                                overflow: 'hidden',
                                padding: 2
                            }}
                        >
                            <Typography sx={{ width: '170px', height: 'auto', display: "flex", flexDirection: ematches ? 'column' : 'row', textAlign: 'center' }}>Event: <Typography> {localEvent.EventType}</Typography></Typography>
                            <Typography sx={{ width: ematches ? '370px' : '500px', display: "flex", flexDirection: ematches ? 'column' : 'row', textAlign: 'center' }}>Address: <Typography> {localEvent.Address}</Typography></Typography>
                            <Box>
                                <Button onClick={handleEdit}>Edit</Button>
                                <Button onClick={handleRemove}>Remove</Button>
                            </Box>
                        </Box>
                    )}
            </Box>
        </ThemeProvider >
    );
};

export default EventMaker;
