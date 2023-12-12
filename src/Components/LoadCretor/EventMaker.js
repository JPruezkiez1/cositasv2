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
        onSave(event.id, localEvent);
    };
    const handleEdit = () => {
        onEdit(event.id);
    };

    const handleRemove = () => {
        onRemove(event.id);
    };
    return (
        <Box>
            <Typography variant="h5">Create Event</Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" >
                {isEditing ? (
                    <>
                        <TextField name="EventType" label="Event Type" value={localEvent.EventType} onChange={handleChange} />
                        <TextField name="Weight" label="Weight" value={localEvent.Weight} onChange={handleChange} />
                        <TextField name="Address" label="Address" value={localEvent.Address} onChange={handleChange} />
                        <TextField name="CallOrder" label="Call Order" value={localEvent.CallOrder} onChange={handleChange} />
                        <TextField name="LoadID" label="Load ID" value={localEvent.LoadID} onChange={handleChange} />
                        <TextField name="State" label="State" value={localEvent.State} onChange={handleChange} />
                        <TextField name="Country" label="Country" value={localEvent.Country} onChange={handleChange} />
                        <TextField name="City" label="City" value={localEvent.City} onChange={handleChange} />
                        <TextField name="Status" label="Status" value={localEvent.Status} onChange={handleChange} />
                        <TextField name="POD" label="POD" value={localEvent.POD} onChange={handleChange} />
                        <Button onClick={handleSave}>Save</Button>
                    </>
                ) : (
                    <>
                        <Typography>Event Type: {localEvent.EventType}</Typography>
                        <Typography>Weight: {localEvent.Weight}</Typography>
                        <Typography>Address: {localEvent.Address}</Typography>
                        <Typography>Call Order: {localEvent.CallOrder}</Typography>
                        <Typography>Load ID: {localEvent.LoadID}</Typography>
                        <Typography>State: {localEvent.State}</Typography>
                        <Typography>Country: {localEvent.Country}</Typography>
                        <Typography>City: {localEvent.City}</Typography>
                        <Typography>Status: {localEvent.Status}</Typography>
                        <Typography>POD: {localEvent.POD}</Typography>
                        <Button onClick={handleEdit}>Edit</Button>
                        <Button onClick={handleRemove}>Remove</Button>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default EventMaker;
