import React from 'react';
import { Box } from '@mui/system';
import MapComponent from '../../Components/Map/Map';
import LoadTable from '../../Components/Loads/Loads';
import LoadInfo from '../../Components/LoadSnipets/LoadSnipet';
import Container from '../../Components/Container/Container';
const LoadPages = () => {
    return (
        <Container>
            <Box sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                <Box sx={{ height: '50%', display: 'flex' }}>
                    <Box sx={{ width: '40%' }}>
                        <MapComponent />

                    </Box>
                    <Box classname='information_box' sx={{ width: '60%', border: '2px solid black', overflow: 'hidden' }} >
                        <LoadInfo />
                    </Box>
                </Box>
                <Box sx={{ height: '50%', bgcolor: '' }} >
                    <LoadTable />
                </Box>
            </Box>
        </Container>
    );
}

export default LoadPages;
