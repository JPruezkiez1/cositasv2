import React, { useState } from 'react';
import Container from '../../Components/Container/Container';
import Alert from '@mui/material/Alert';
const FileUploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [name, setName] = useState('');

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleUpload = () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('image', file);
        });
        formData.append('name', name);

        fetch('https://file.jpruezkiez.com/', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setSelectedFiles([]);
                setName('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Container>
            <div>
                <div>
                    <input type="file" onChange={handleFileChange} multiple />
                    <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
                    <button onClick={handleUpload}>Upload</button>
                </div>
                <Alert severity="success">This is a success alert — check it out!</Alert>
            </div>
        </Container>
    );
};

export default FileUploadComponent;
