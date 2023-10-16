import React, { useEffect, useState, useContext } from 'react';
import Container from '../../Components/Container/Container';
import axios from 'axios';
import ImageCard from './ImageCard';
import { DefaultContext } from '../../Context/Context';
import TestModal from '../TesterField/ModalTest';

export default function Gal() {
    const [filteredData, setFilteredData] = useState([]);
    const { handleOpen } = useContext(DefaultContext);
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get('https://nodejs.jpruezkiez.com/checkimage');
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
                <ImageCard customStyle={{ width: '40vw' }} setSelectedImage={setSelectedImage} handleOpen={handleOpen} imagedata={filteredData} />
            </div>
            <TestModal content={<img src={selectedImage} style={{ objectFit: 'fill', background: 'red', width: '100%', height: '100%' }} />} />
        </Container>
    );
}
