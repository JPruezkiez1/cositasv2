import React from 'react';

export default function ImageGrid({ imagesData, handleOpen, setSelectedImage }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {imagesData.map((item, index) => {
                const fileExtension = item.File_link.split('.').pop().toLowerCase();
                const isVideo = ['mp4', 'mov', 'avi', 'flv', 'wmv', 'mkv', 'webm', 'm4v', '3gp', '3g2', 'f4v', 'f4p', 'f4a', 'f4b', 'vob', 'ogv', 'ogg', 'drc', 'gifv', 'mng', 'mts', 'm2ts', 'ts', 'qt', 'yuv', 'rm', 'rmvb', 'asf', 'amv', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'm2v', 'svi', '3g2', 'mxf', 'roq', 'nsv'].includes(fileExtension);
                return (
                    <div key={index} style={{ margin: '10px' }}>
                        {isVideo ? (
                            <video
                                src={item.File_link}
                                style={{ width: '320px', height: '212px' }}
                                controls
                                onClick={() => {
                                    console.log('Video clicked, opening modal...');
                                    handleOpen();
                                    setSelectedImage(item.File_link);
                                }}
                            />
                        ) : (
                            <img
                                src={item.File_link}
                                alt=""
                                style={{ objectFit: 'contain', width: '320px', height: '212px' }}
                                onClick={() => {
                                    console.log('Image clicked, opening modal...');
                                    handleOpen();
                                    setSelectedImage(item.File_link);
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

