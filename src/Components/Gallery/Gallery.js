import React from 'react';

export default function ImageGrid({ imagesData, handleOpen, setSelectedImage }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {imagesData.map((item, index) => (
                <div key={index} style={{ margin: '10px' }}>
                    <img
                        src={item.File_Link}
                        alt=""
                        style={{ width: '320px', height: '212px' }}
                        onClick={() => {
                            console.log('Image clicked, opening modal...');
                            handleOpen();
                            setSelectedImage(item.File_Link);
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
