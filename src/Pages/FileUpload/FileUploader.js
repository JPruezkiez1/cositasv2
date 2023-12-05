import React, { useState } from 'react';
import { Button, TextField, Box, Typography, List, ListItem, IconButton } from '@mui/material';
import Container from '../../Components/Container/Container';
import CloseIcon from '@mui/icons-material/Close';

const FileUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadname, setuploadName] = useState('');

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

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
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
                />
                <Button
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


                <List sx={{ border: '1px solid red', width: '100%' }}>
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
                    variant="contained"
                    color="secondary"
                    fullWidth
                    margin="normal"
                >
                    Upload
                </Button>
            </Box>
        </Container>
    );
};

export default FileUploader;
