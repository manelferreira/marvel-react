import { Fragment } from 'react';
import { Chip, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import styled from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { increaseItemQuantity, decreaseItemQuantity, ShoppingCartItem, ShoppingCart } from "../../store/shoppingCartSlice"
import { useAppDispatch } from '../../store/hooks';
import Money from '../../models/Money';

const ShoppingCartList : React.FC<{ shoppingCart: ShoppingCart }> = (props) => {
    const dispatch = useAppDispatch();

    let shoppingCartList = props.shoppingCart.items;

    const increaseItemQuantityHandler = (item: ShoppingCartItem) => {
        dispatch(increaseItemQuantity(item))
    }

    const decreaseItemQuantityHandler = (item: ShoppingCartItem) => {
        dispatch(decreaseItemQuantity(item))
    }
    
    return (
        <CartListContainer>
           <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                shoppingCartList.map((item, i) => (
                    <Fragment key={item.id}>
                    <ListItem>
                        <StyledListItemBody>
                            <StyledImageContainer>
                                <StyledImage src={item.imageUrl} />
                            </StyledImageContainer>
                            
                            <ListItemText 
                                disableTypography
                                primary={
                                    <Typography variant="h6" gutterBottom component="div">
                                        {item.name}
                                    </Typography>
                                } 
                                secondary={
                                    <Chip label={new Money(item.price.amount).formattedAmount} />
                                } />
                        </StyledListItemBody>
                        <StyledListItemActions>
                            <IconButton aria-label="up" onClick={() => increaseItemQuantityHandler(item)}>
                                <KeyboardArrowUp />
                            </IconButton>

                            <Chip label={item.quantity} variant="outlined" 
                            />

                            <IconButton aria-label="down" onClick={() => decreaseItemQuantityHandler(item)}>
                                <KeyboardArrowDown />
                            </IconButton>
                        </StyledListItemActions>
                        <StyledListItemSummary>
                            <Chip 
                                label={new Money(item.quantity * item.price.amount).formattedAmount}
                                color="primary" />
                        </StyledListItemSummary>
                    </ListItem>
                    
                    { shoppingCartList.length - 1 != i && <Divider key={i} /> }
                    
                    </Fragment>
                    
                ))
            }
            </List>
        </CartListContainer>
    )
}

const StyledListItemBody = styled.div`
    display: flex;
    width: 100%;
    gap: 1rem;
`

const StyledImageContainer = styled.div`
    display: flex;
    max-width: 150px;
    background-color: #eee;
    max-height: 150px;
    justify-content: center;
`

const StyledImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`

const StyledListItemActions = styled.div`
    display: flex;
    flex-direction: column;
    gap-column: 0.5rem;
    align-items: center;
`

const StyledListItemSummary = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 3rem;
    width: 100px;
`

const CartListContainer = styled.div`
    display: flex;
    min-width: 70%;
    max-width: 70%;
`

export default ShoppingCartList;