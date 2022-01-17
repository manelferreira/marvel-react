
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { getCoupons } from '../integrations/coupons/couponsIntegration';
import Coupon from '../models/Coupon';
import ReceiptIcon from '@mui/icons-material/Receipt';

const CouponsPage = () => {
    const [couponsList, setCouponsList] = useState<Coupon[]>([])
    
    useEffect(() => {
        fetchCouponsList()
    }, [])

    async function fetchCouponsList() {
        var coupons = await getCoupons();
        setCouponsList(coupons);
    }

    return (
        <Fragment>
            <Typography variant="h5" gutterBottom component="div">
                Lista de cupons
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    couponsList.map((coupon) => (
                        <ListItem key={coupon.id}>
                            <ListItemAvatar>
                            <Avatar>
                                <ReceiptIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`Código: ${coupon.code}`} secondary={coupon.formattedFee} />
                        </ListItem>
                    ))
                }
            </List>
        </Fragment>
    );
};

export default CouponsPage; 