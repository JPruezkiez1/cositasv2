// GalleryView Page
import React, { useEffect, useState, useContext } from 'react';
import ImageGrid from '../../Components/Gallery/Gallery';
import Container from "../../Components/Container/Container";
import axios from 'axios';
import { ModalContext } from '../../Context/MContext'
import TestModal from '../../Components/Modal/ModalTest';

export default function GalleryView() {
    const [filteredData, setFilteredData] = useState([]);
    const { checkimg, openimg, closeimg } = useContext(ModalContext);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get('https://ns1.jpruezkiez.com/checkimage');
                const data = response.data;
                const filteredData = data.filter((item) => item.name === 'uwu');
                setFilteredData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchImageData();
    }, []);

    return (
        <Container>
            <ImageGrid handleOpen={openimg} setSelectedImage={setSelectedImage} imagesData={filteredData} style={{ width: '100%' }} />
            <TestModal open={checkimg} handleClose={closeimg} content={<img alt='image_' src={selectedImage} style={{ minHeight: '65vh', minWidth: '320px', width: '100%', maxHeight: '80vh', objectFit: 'fill', background: 'red', }} />} />
        </Container>
    );
}
