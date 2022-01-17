import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { applyCouponOnCart, removeCouponAppliedOnCart, ShoppingCart } from "../../store/shoppingCartSlice";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { applyCoupon } from "../../integrations/coupons/couponsIntegration";
import { useAppDispatch } from "../../store/hooks";

const ShoppingCartCoupon : React.FC<{ shoppingCart: ShoppingCart }> = (props) => {
    const dispatch = useAppDispatch();
    const shoppingCartCoupon = props.shoppingCart.coupon;
    
    const [inputtedCouponCode, setInputtedCouponCode] = useState("");

    var initialCouponAppliedWithSuccessValues = { triedToApply: false, withSuccess: false};
    const [couponAppliedWithSuccess, setCouponAppliedWithSuccess] = useState<{ 
        triedToApply: boolean, 
        withSuccess: boolean
    }>(initialCouponAppliedWithSuccessValues);

    const handleInputCouponChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setInputtedCouponCode(event.target.value);

        if (event.target.value === "")
            setCouponAppliedWithSuccess({ triedToApply: false, withSuccess: false });
    }

    const applyCouponHandler = async (code: string) => {
        let appliedCoupon = await applyCoupon(code);

        setCouponAppliedWithSuccess({ triedToApply: true, withSuccess: appliedCoupon.success });

        if (appliedCoupon.success)
        {
            dispatch(applyCouponOnCart(
                {
                    triedToApply: true,
                    appliedWithSuccess: true,
                    meta: {
                        id: appliedCoupon.coupon?.id || 0,
                        fee: appliedCoupon.coupon?.fee || 0,
                        code: appliedCoupon.coupon?.code || ""
                    }
                }
            ))
        }
    }

    const removeAppliedCouponHandler = () => {
        setCouponAppliedWithSuccess(initialCouponAppliedWithSuccessValues);
        dispatch(removeCouponAppliedOnCart())
    }

    return (
        <CouponContainer>
            <ApplyCouponContainer>
                <TextField 
                    id="coupon-input" 
                    label="Código do cupom" 
                    variant="standard" 
                    error={couponAppliedWithSuccess.triedToApply && !couponAppliedWithSuccess.withSuccess}
                    color={couponAppliedWithSuccess.triedToApply && couponAppliedWithSuccess ? "success" : "primary"}
                    focused={couponAppliedWithSuccess.triedToApply && couponAppliedWithSuccess ? true : false}
                    onChange={handleInputCouponChange}/>

                    <IconButton aria-label="apply" onClick={() => applyCouponHandler(inputtedCouponCode)}>
                        <CheckIcon />
                    </IconButton>
            </ApplyCouponContainer>

            { shoppingCartCoupon.appliedWithSuccess && 
                <AppliedCouponContainer>
                    <AppliedCouponInfo>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography color="text.secondary" variant="body2">
                                    Cupom aplicado
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color="text.secondary" variant="body2">
                                    { shoppingCartCoupon.meta?.code || "" }
                                </Typography>
                            </Grid>
                        </Grid>
                    </AppliedCouponInfo>
                    <AppliedCouponRemoveControl>
                        <Button size="small" color="secondary" onClick={removeAppliedCouponHandler}>
                            Remover
                        </Button>
                    </AppliedCouponRemoveControl>
                </AppliedCouponContainer>
            }
        </CouponContainer>
    )
}

const CouponContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ApplyCouponContainer = styled.div`
    display: flex;
    padding: 1rem 1rem;
    align-items: baseline;
    justify-content: space-evenly;
`

const AppliedCouponContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const AppliedCouponInfo = styled.div`
    display: flex;
    padding: 1rem 1rem 0.5rem 1rem;
    align-items: baseline;
    justify-content: space-evenly;
`

const AppliedCouponRemoveControl = styled.div`
    display: flex;
    padding: 0rem 0.75rem 1rem 0;
    align-items: baseline;
    justify-content: right;
`

export default ShoppingCartCoupon;