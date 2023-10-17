import { useContext } from "react"
import './Store.css'
import { DefaultContext } from "../../Context/Context"
import ProductCard from '../../Components/ProductCard/ProductCard'
import Container from '../../Components/Container/Container'
import { Alert } from "@mui/material"

export default function Store() {
    const context = useContext(DefaultContext);

    const conditionalRenderForSearch = () => {
        if (context.products?.length > 0) {
            return context.products?.map((product) => (
                <ProductCard key={product.id} productdata={product} />
            ));
        }
        return <Alert sx={{ marginTop: '30px', height: 70, fontSize: 30 }} severity="error">Could not load products!</Alert>
    };;

    return (
        <Container>
            <div className='Store_container'>{conditionalRenderForSearch()}</div>
        </Container>
    )


}