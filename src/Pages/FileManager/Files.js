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
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'image', headerName: 'File Url', width: 230 },
        { field: 'FileName', headerName: 'File Name', width: 230 },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = async () => {
                    const id = params.row.id;
                    const fileName = params.row.FileName; // Use FileName instead of image

                    try {
                        const response = await axios.delete('https://file.jpruezkiez.com/deletefile', {
                            data: { image: fileName } // Use FileName instead of image
                        });

                        console.log(response.data);
                        setData((prevData) => prevData.filter((data) => data.id !== id));
                    } catch (error) {
                        console.error('Error:', error);
                    }
                };

                return <Button variant="contained" color="secondary" onClick={onClick}>Delete</Button>;
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
