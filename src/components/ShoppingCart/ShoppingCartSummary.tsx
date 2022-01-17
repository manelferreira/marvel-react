import { Box, Button, Card, CardActions, Divider, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { selectFinalAmount, selectProductsAmount, selectQuantity } from "../../store/shoppingCartSlice"
import { useAppSelector } from '../../store/hooks';
import ShoppingCartCoupon from './ShoppingCartCoupon';
import { ShoppingCart as StoreShoppingCart } from "../../store/shoppingCartSlice";

const ShoppingCart : React.FC<{ shoppingCart: StoreShoppingCart }> = (props) => {
    let finalAmount = useAppSelector(selectFinalAmount);
    let productsAmount = useAppSelector(selectProductsAmount);
    
    return (
        <CartSummaryContainer>
            <Card sx={{width: "100%"}} variant='outlined'>
                <Box sx={{ my: 3, mx: 2 }}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h5" component="div">
                                Valor final
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h6" component="div">
                            {  finalAmount.formattedAmount }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography color="text.secondary" variant="body2">
                                Valor dos produtos
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="text.secondary" variant="body2">
                                { productsAmount.formattedAmount }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography color="text.secondary" variant="body2">
                                Qtd. de itens
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="text.secondary" variant="body2">
                                { useAppSelector(selectQuantity) }
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="middle">CUPOM</Divider>

                <ShoppingCartCoupon shoppingCart={props.shoppingCart} />

                <Divider variant="middle" />

                <CardActions sx={{ justifyContent: "right"}}>
                    <Button size="small">Finalizar compra</Button>
                </CardActions>
            </Card>
        </CartSummaryContainer>
    )
}

const CartSummaryContainer = styled.div`
    display: flex;
    min-width: 25%;
    max-width: 25%;
`


export default ShoppingCart;