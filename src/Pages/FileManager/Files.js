import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://ns1.jpruezkiez.com/checkimage');
            setData(result.data);
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'upload', headerName: 'Upload Name', width: 130 },
        { field: 'File_Link', headerName: 'Link To File', width: 230 },
        { field: 'mbsize', headerName: 'Size In MB', width: 130 },
        { field: 'file', headerName: 'FileName', width: 230 },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
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
            headerName: 'Download',
            sortable: false,
            width: 130,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    const url = params.row.File_Link;
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
        <div style={{ height: '70vh', width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={5} />
        </div>
    );
};

export default DataTable;
