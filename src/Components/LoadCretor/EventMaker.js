import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const EventMaker = ({ event, isEditing, onSave, onEdit, onRemove, callOrder }) => {
    const [localEvent, setLocalEvent] = useState(event);

    useEffect(() => {
        setLocalEvent({ ...event, CallOrder: callOrder });
    }, [event, callOrder]);

    const handleChange = (e) => {
        setLocalEvent({ ...localEvent, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(localEvent);
    };

    const handleEdit = () => {
        onEdit();
    };

    const handleRemove = () => {
        onRemove();
    };

    return (
        <Box>
            <Typography variant="h5">Create Event</Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {isEditing ? (
                    <>
                        <TextField name="EventType" label="Event Type" value={localEvent.EventType} onChange={handleChange} />
                        <TextField name="Weight" label="Weight" value={localEvent.Weight} onChange={handleChange} />
                        <TextField name="Address" label="Address" value={localEvent.Address} onChange={handleChange} />
                        <TextField name="State" label="State" value={localEvent.State} onChange={handleChange} />
                        <TextField name="Country" label="Country" value={localEvent.Country} onChange={handleChange} />
                        <TextField name="City" label="City" value={localEvent.City} onChange={handleChange} />
                        <TextField name="Status" label="Status" value={localEvent.Status} onChange={handleChange} />
                        <Button onClick={handleSave}>Save</Button>
                    </>
                ) : (
                    <>
                        <Typography>Event Type: {localEvent.EventType}</Typography>
                        <Typography>Weight: {localEvent.Weight}</Typography>
                        <Typography>Address: {localEvent.Address}</Typography>
                        <Typography>State: {localEvent.State}</Typography>
                        <Typography>Country: {localEvent.Country}</Typography>
                        <Typography>City: {localEvent.City}</Typography>
                        <Typography>Status: {localEvent.Status}</Typography>
                        <Button onClick={handleEdit}>Edit</Button>
                        <Button onClick={handleRemove}>Remove</Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default EventMaker;
