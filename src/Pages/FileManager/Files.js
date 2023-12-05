import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import FileUploader from '../FileUpload/FileUploader';
import Container from '../../Components/Container/Container';
import TestModal from '../../Components/Modal/ModalTest'
const DataTable = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://ns1.jpruezkiez.com/checkimage/uploadname/naza');
            setData(result.data);
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'upload', headerName: 'Upload Name', width: 130 },
        { field: 'File_link', headerName: 'Link To File', width: 230 },
        { field: 'mbsize', headerName: 'Size In MB', width: 130 },
        { field: 'file', headerName: 'FileName', width: 230 },
        { field: 'Owner', headerName: 'File Owner', width: 230 },
        {
            sortable: false,
            disableColumnMenu: true,
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = async () => {
                    const id = params.row.id;
                    const fileName = params.row.file;
                    try {
                        const response = await axios.delete('https://file.jpruezkiez.com/deletefile', {
                            data: { filename: fileName }
                        });

                        console.log(response.data);
                        setData((prevData) => prevData.filter((data) => data.id !== id));
                    } catch (error) {
                        console.error('Error:', error);
                    }
                };
                return <Button sx={{
                    background: '#000',
                    '&:hover': {
                        backgroundColor: 'red',
                    },
                }} variant="contained" color="secondary" onClick={onClick}>Delete</Button>;
            },
        },
        {
            field: 'download',
            headerName: '',
            sortable: false,
            width: 130,
            disableColumnMenu: true,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    const url = params.row.File_link;
                    window.open(url, '_blank');
                };

                return <Button sx={{
                    background: '#834AFD',
                    '&:hover': {
                        backgroundColor: '#834AFD',
                    },
                }} variant="contained" color="primary" onClick={onClick}>Download</Button>;
            },
        },
    ];

    return (
        <Container>
            <div style={{ height: '70vh', width: '100%' }}>
                <DataGrid rows={data} columns={columns} pageSize={5} />
            </div>
            <Button
                onClick={handleOpen}
                sx={{
                    width: 250,
                    height: 90,
                    background: '#834AFD',
                    '&:hover': {
                        backgroundColor: '#834AFD',
                    },
                }}
                variant="contained"
                color="primary"
                component="label"
                fullWidth
                margin="normal"
            >Upload New File</Button>
            <TestModal
                content={<FileUploader />}
                open={open}
                handleClose={handleClose}
            />
        </Container>
    );
};

export default DataTable;
