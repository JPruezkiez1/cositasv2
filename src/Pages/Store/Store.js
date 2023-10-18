import { useContext } from "react";
import './Store.css';
import { DefaultContext } from "../../Context/Context";
import ProductCard from '../../Components/ProductCard/ProductCard';
import Container from '../../Components/Container/Container';
import { Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Footer from "../../Components/Footer/Footer";
export default function Store() {
    const context = useContext(DefaultContext);
    const navigate = useNavigate();

    const conditionalRenderForSearch = () => {
        if (context.products?.length > 0) {
            return context.products?.map((product) => (
                <ProductCard key={product.id} productdata={product} />
            ));
        }
        return <Alert sx={{ marginTop: '30px', height: 70, fontSize: 30 }} severity="error">Could not load products!</Alert>
    };

    return (
        <Container>
            <div>
                <div className='Store_container'>
                    {conditionalRenderForSearch()}
                </div>

            </div>
            <Footer content={<div style={{ display: 'flex', alignItems: 'space-between' }}>
                <button onClick={() => navigate(`/store?p=${context.pageNumber > 1 ? context.pageNumber - 1 : 1}`)}>{"<"}</button>
                <span>{context.pageNumber}</span>
                <button onClick={() => navigate(`/store?p=${context.pageNumber < context.maxPage ? context.pageNumber + 1 : context.maxPage}`)}>{">"}</button>
            </div>} active={'yes'} />
        </Container>
    );
}
