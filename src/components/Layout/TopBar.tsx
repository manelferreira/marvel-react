import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../../store/hooks';
import { selectQuantity } from '../../store/shoppingCartSlice';
import { Badge } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ReceiptIcon from '@mui/icons-material/Receipt';
import styled from 'styled-components';
import Logo from './Logo';

const TopBar = () => {
    let navigate = useNavigate();

    const clickedOnCartHandler = () => {
        navigate(`../shoppingCart`);
    }

    const clickedOnCouponHandler = () => {
        navigate(`../coupons`);
    }

    const clickedOnTitleHandler = () => {
        navigate(`../`);
    }

    return (
        <Box sx={{ flexGrow: 1, marginBottom: '1.5rem' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1 }} onClick={clickedOnTitleHandler}>
                        <Logo />
                    </Typography>
                    <IconButton
                        size="large"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={clickedOnCouponHandler}
                        >
                            <ReceiptIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={clickedOnCartHandler}
                        >
                        <Badge badgeContent={useAppSelector(selectQuantity)} color="secondary" showZero>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopBar;