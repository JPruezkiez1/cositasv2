import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductCard({ productdata, handleOpen }) {
    const handleImageClick = () => {
        handleOpen();
    };

    return (
        <Card onClick={handleImageClick} sx={{ width: 345, maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={productdata.image}
                alt="product label"
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {productdata.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {productdata.description}
                </Typography>
                <Typography variant="h6" component="div">
                    {productdata.price}
                </Typography>
            </CardContent>
            <IconButton aria-label="add to shopping cart">
                <AddShoppingCartIcon />
            </IconButton>
        </Card>
    );
}

export default ProductCard;
