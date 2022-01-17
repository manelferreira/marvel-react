
import { useAppSelector } from '../store/hooks';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';
import ShoppingCartList from '../components/ShoppingCart/ShoppingCartList';
import ShoppingCartSummary from '../components/ShoppingCart/ShoppingCartSummary';

const ShoppingCartPage = () => {
    const shoppingCart = useAppSelector((state) => state.shoppingCart)

    return (
        <Fragment>
            <Typography variant="h5" gutterBottom component="div">
                Carrinho de compras
            </Typography>
            <ShoppingCart>
                <ShoppingCartList shoppingCart={shoppingCart} />
                <ShoppingCartSummary shoppingCart={shoppingCart} />
            </ShoppingCart>
        </Fragment>
    );
};

export default ShoppingCartPage;