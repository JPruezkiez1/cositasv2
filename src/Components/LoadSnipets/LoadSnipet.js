import React, { useContext } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { DefaultContext } from '../../Context/Context';

const LoadInfo = () => {
    const [expandedEventIndex, setExpandedEventIndex] = React.useState(null);
    const { selectedLoad } = useContext(DefaultContext);
    const handleToggle = (index) => {
        setExpandedEventIndex(expandedEventIndex === index ? null : index);
    }


    if (!selectedLoad) {
        return (
            <Typography variant="h4">Please select a load to continue</Typography>
        );
    }

    const sortedEvents = selectedLoad.events ? [...selectedLoad.events].sort((a, b) => a.CallOrder - b.CallOrder) : [];
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Load ID: {selectedLoad?.LoadID}</Typography>
                <Typography variant="body1">Load Name: {selectedLoad?.LoadName}</Typography>
                <Typography variant="body1">Truck Type: {selectedLoad?.TruckType}</Typography>
                <Typography variant="body1">Payment: {selectedLoad?.Payment}</Typography>
                <Typography variant="body1">Driver: {selectedLoad?.Driver}</Typography>
                <Typography variant="body1">Rate Confirmation: {selectedLoad?.RateConfirmation}</Typography>
                <Typography variant="body1">Truck VIN: {selectedLoad?.TruckVIN}</Typography>
                <Typography variant="body1">Dispatcher: {selectedLoad?.Dispatcher}</Typography>
                <Typography variant="h6">Legs:</Typography>
            </Box>
            <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                {sortedEvents.map((event, index) => (
                    <Box key={index} sx={{ p: 2, border: '1px solid black', borderRadius: 1, m: 1 }} onClick={() => handleToggle(index)}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
                            <Typography variant="body1">Stop Type: {event.EventType}</Typography>
                            <Typography variant="body1">Address: {event.Address}</Typography>
                            <Typography variant="body1">Status: {event.Status}</Typography>
                        </Box>
                        <Collapse in={expandedEventIndex === index}>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">Order: {event.CallOrder}</Typography>
                            </Box>
                        </Collapse>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default LoadInfo;
