import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import './Product.css'
function ProductCard({ productdata, handleOpen }) {

    const handleImageClick = (item) => {
        handleOpen();
    };

    return (
        <div onClick={handleImageClick} className='product_card'>
            <img className='product_card_image' alt='product label' src={productdata.image} />
            <div>{productdata.price}</div>
            <div>{productdata.title}</div>
            <IconButton className='product_Card_button' sx={{ width: '50px', height: '50px', color: '#834AFD' }} aria-label="add to shopping cart">
                <AddShoppingCartIcon sx={{ width: '50px', height: '50px', color: '#834AFD' }} />
            </IconButton>
        </div>
    );
}

export default ProductCard;