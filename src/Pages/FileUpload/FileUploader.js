import React, { useState } from 'react';
import { Button, TextField, Box, Typography, List, ListItem, IconButton } from '@mui/material';
// import Container from '../../Components/Container/Container';
import CloseIcon from '@mui/icons-material/Close';

const FileUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadname, setuploadName] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFiles(prevFiles => {
            const newFiles = [...prevFiles, ...event.target.files];
            if (newFiles.length > 10) {
                console.error('You can only select up to 10 files in total');
                return prevFiles;
            }
            return newFiles;
        });
        event.target.value = null;
    };

    const handleNameChange = (event) => {
        setuploadName(event.target.value);
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((file, i) => i !== index));
    };

    const truncateFileName = (name) => {
        const maxLength = 20;
        const extension = name.split('.').pop();
        const fileName = name.replace(`.${extension}`, '');
        return fileName.length > maxLength
            ? `${fileName.substring(0, maxLength)}... .${extension}`
            : name;
    };

    const handleUpload = () => {
        if (uploadname.length < 4) {
            console.error('Upload name must be at least 4 characters long');
            return;
        }

        const totalSize = selectedFiles.reduce((total, file) => total + file.size / (1024 * 1024), 0);

        if (totalSize > 100) {
            console.error('Total file size exceeds 100MB');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('filename', file);
        });
        formData.append('uploadname', uploadname);
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const customerId = loggedInUser?.customerId;

        if (customerId) {
            formData.append('customerId', customerId);
        } else {
            console.error('No customerId found');
            return;
        }

        fetch('https://file.jpruezkiez.com/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setSelectedFiles([]);
                setuploadName('');
                setIsUploading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsUploading(false);
            });
    };

    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 320,
                maxWidth: 370,
                padding: 2,
                border: '1px solid black',
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Upload Name"
                fullWidth
                margin="normal"
                value={uploadname}
                onChange={handleNameChange}
                sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#834AFD',
                    },
                    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#834AFD',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#834AFD',
                    },
                }}
            />
            <Button
                sx={{
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
                disabled={selectedFiles.length >= 10}
            >
                Select Files
                <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
            <List sx={{ width: '100%' }}>
                {selectedFiles.map((file, index) => (
                    <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <Typography variant="body1">{truncateFileName(file.name)}</Typography>
                            <Typography variant="body2">{`(${(file.size / (1024 * 1024)).toFixed(2)} MB)`}</Typography>
                        </div>
                        <IconButton onClick={() => handleRemoveFile(index)}><CloseIcon /></IconButton>
                    </ListItem>
                ))}
            </List>
            <Button
                sx={{
                    background: '#834AFD',
                    '&:hover': {
                        backgroundColor: '#834AFD',
                    },
                }}
                variant="contained"
                color="secondary"
                fullWidth
                margin="normal"
                onClick={handleUpload}
                disabled={isUploading || uploadname.length < 4 || selectedFiles.length === 0}
            >
                {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
        </Box>
    );
};

export default FileUploader;
