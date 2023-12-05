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
                const filteredData = data.filter((item) => {
                    const fileExtension = item.File_link.split('.').pop().toLowerCase();
                    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'ico', 'tif', 'tiff', 'svg', 'jif', 'jfif', 'jp2', 'jpx', 'j2k', 'j2c', 'fpx', 'pcd'];
                    const videoExtensions = ['mp4', 'mov', 'avi', 'flv', 'wmv', 'mkv', 'webm', 'm4v', '3gp', '3g2', 'f4v', 'f4p', 'f4a', 'f4b', 'vob', 'ogv', 'ogg', 'drc', 'gifv', 'mng', 'mts', 'm2ts', 'ts', 'qt', 'yuv', 'rm', 'rmvb', 'asf', 'amv', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'm2v', 'svi', '3g2', 'mxf', 'roq', 'nsv'];
                    return imageExtensions.includes(fileExtension) || videoExtensions.includes(fileExtension);
                });
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
            <TestModal open={checkimg} handleClose={closeimg} content={<img alt='image_' src={selectedImage} style={{ minHeight: 'content', minWidth: '320px', width: '100%', maxHeight: '90vh', objectFit: 'fill', background: 'red', }} />} />
        </Container>
    );
}
