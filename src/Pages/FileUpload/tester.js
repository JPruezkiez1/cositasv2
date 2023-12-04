import React, { useState } from 'react';
import Container from '../../Components/Container/Container';
import Alert from '@mui/material/Alert';

const FileUploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [name, setName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isUploading, setIsUploading] = useState(false); // Add this line

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleUpload = () => {
        setIsUploading(true);
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
                setShowAlert(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                console.error('Error:', error);
                setShowAlert(false);
                setIsUploading(false);
            });
    };

    return (
        <Container>
            <div>
                <div>
                    <input type="file" onChange={handleFileChange} multiple />
                    <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
                    <button onClick={handleUpload} disabled={isUploading}>Upload</button>
                </div>
                {showAlert && <Alert severity="success">Done!</Alert>}
            </div>
        </Container>
    );
};

export default FileUploadComponent;
