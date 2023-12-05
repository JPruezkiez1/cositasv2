import React, { useState, useRef } from 'react';
import Container from '../../Components/Container/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const FileUploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadname, setuploadName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef();  // Create a ref for the file input field

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleNameChange = (event) => {
        setuploadName(event.target.value);
    };

    const handleUpload = () => {
        if (uploadname.length < 4) {
            setAlertMessage('Upload name must be at least 4 characters long');
            setShowAlert(true);
            return;
        }

        const totalSize = selectedFiles.reduce((total, file) => total + file.size / (1024 * 1024), 0);

        if (totalSize > 100) {
            setAlertMessage('Total file size exceeds 100MB');
            setShowAlert(true);
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
                setAlertMessage('Done!');
                setShowAlert(true);
                setIsUploading(false);
                fileInputRef.current.value = "";  // Clear the file input field
            })
            .catch((error) => {
                console.error('Error:', error);
                setAlertMessage('Error: ' + error.message);
                setShowAlert(true);
                setIsUploading(false);
            });
    };

    return (
        <Container>
            <div>
                <div>
                    <input type="file" onChange={handleFileChange} multiple ref={fileInputRef} />  {/* Attach the ref to the file input field */}
                    <input type="text" value={uploadname} onChange={handleNameChange} placeholder="Upload Name" />
                    <button onClick={handleUpload} disabled={isUploading || uploadname.length < 4}>Upload</button>
                </div>
                {isUploading && <CircularProgress />}
                {showAlert && <Alert severity={alertMessage === 'Done!' ? "success" : "error"}>{alertMessage}</Alert>}
            </div>
        </Container>
    );
};

export default FileUploadComponent;
