import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DefaultContext } from '../../Context/Context';
import { useContext } from 'react';


const style = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'md',
    maxHeigh: 'md',
    bgcolor: 'background.paper',
    boxShadow: '2px 2px 45px 2px purple',
    overflow: 'hidden',
    borderRadius: '15px',
};

export default function TestModal({ content }) {

    const { open, handleClose } = useContext(DefaultContext);
    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {content}
                </Box>
            </Modal>
        </div>
    );
}