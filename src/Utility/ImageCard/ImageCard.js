import './Imagecard.css'

export default function ImageCard({ imagedata, customStyle, handleOpen, setSelectedImage }) {
    const handleImageClick = (item) => {
        handleOpen();
        setSelectedImage(item.image);
    };
    return (
        <>
            {imagedata.map((item) => (
                <div onClick={() => handleImageClick(item)} className="photo_place01" style={customStyle} key={item.id} >
                    <img className='img_01' alt={item.image} src={item.image} />
                    <p className='legend_01'>{item.name}</p>
                </div>
            ))}
        </>
    )
}


