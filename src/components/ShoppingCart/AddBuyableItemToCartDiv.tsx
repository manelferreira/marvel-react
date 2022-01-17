import { ShoppingCart } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Fragment } from "react";
import styled from "styled-components";
import BuyableItem from "../../models/BuyableItem";
import { useAppDispatch } from "../../store/hooks";
import { addItemToCart } from "../../store/shoppingCartSlice"

const AddBuyableItemToCartDiv : React.FC<{buyable: BuyableItem}> = (props) => {
    const dispatch = useAppDispatch();

    const buyable = props.buyable;

    return (
        <Fragment>
            <ActionsDiv>
                <Typography gutterBottom variant="h6" component="div">
                    {buyable.price.formattedAmount}
                </Typography>
                <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => dispatch(addItemToCart(
                        {
                            id: buyable.id,
                            name: buyable.name,
                            imageUrl: buyable.imageUrl,
                            price: {
                                amount: buyable.price.amount,
                                currency: buyable.price.currency
                            },
                            quantity: 1
                        }
                    ))}>
                    <ShoppingCart />
                </IconButton>
            </ActionsDiv>
        </Fragment>
    )
}

const ActionsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100% !important;
    align-items: flex-end;
    margin: 0 0.5rem;
`;

export default AddBuyableItemToCartDiv;