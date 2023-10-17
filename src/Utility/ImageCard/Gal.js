import React, { useEffect, useState, useContext } from 'react';
import Container from '../../Components/Container/Container';
import axios from 'axios';
import ImageCard from './ImageCard';
import { ModalContext } from '../../Context/MContext'
import TestModal from '../../Components/Modal/ModalTest';

export default function Gal() {
    const [filteredData, setFilteredData] = useState([]);
    const { checkimg, openimg, closeimg } = useContext(ModalContext);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get('https://ns1.jpruezkiez.com/checkimage');
                const data = response.data;
                const filteredData = data.filter((item) => item.name === 'EA');
                setFilteredData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchImageData();
    }, []);

    return (
        <Container>
            <div className='pics_container'>
                <ImageCard customStyle={{ width: '40vw' }} setSelectedImage={setSelectedImage} handleOpen={openimg} imagedata={filteredData} />
            </div>
            <TestModal open={checkimg} handleClose={closeimg} content={<img alt='image_' src={selectedImage} style={{ width: '100%', height: '90vh', objectFit: 'fill', background: 'red', }} />} />
        </Container>
    );
}
