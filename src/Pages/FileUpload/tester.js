import React, { useState } from 'react';

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

        fetch('http://file.jpruezkiez.com/', {
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
        <div>
            <input type="file" onChange={handleFileChange} multiple />
            <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUploadComponent;
