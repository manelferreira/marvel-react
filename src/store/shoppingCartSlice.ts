import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ShoppingCartCoupon from '../components/ShoppingCart/ShoppingCartCoupon';
import Coupon from '../models/Coupon';
import Money from '../models/Money';
import { RootState } from './store';

export interface ShoppingCartItem { 
    id: number,
    name: string,
    imageUrl: string,
    price: {
        amount: number,
        currency: string
    },
    quantity: number
}

export interface ShoppingCartCoupon {
    triedToApply: boolean,
    appliedWithSuccess: boolean,
    meta: {
        id: number,
        fee: number,
        code: string
    } | undefined
}

export interface ShoppingCart {
    items: ShoppingCartItem[],
    coupon: ShoppingCartCoupon
}

const initialCouponState = { triedToApply: false, appliedWithSuccess: false, meta: undefined };
const initialState: ShoppingCart = {
    items: [],
    coupon: initialCouponState
}

const cartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<ShoppingCartItem>) => {
            var currentCartItems = state.items
            var newItem = action.payload;

            let existentItem = findItemOnCart(state, newItem.id)
            
            if (existentItem)
                existentItem.quantity += newItem.quantity;
            else
                currentCartItems.push(action.payload);
        },
        increaseItemQuantity: (state, action: PayloadAction<ShoppingCartItem>) => {
            let existentItem = findItemOnCart(state, action.payload.id)
            
            if (existentItem)
                existentItem.quantity += 1; 
        },
        decreaseItemQuantity: (state, action: PayloadAction<ShoppingCartItem>) => {
            let existentItem = findItemOnCart(state, action.payload.id)
            
            if (existentItem)
            {
                existentItem.quantity -= 1;

                if (existentItem.quantity === 0)
                    removeItemFromCart(state, action.payload)
            }
        },
        applyCouponOnCart: (state, action: PayloadAction<ShoppingCartCoupon>) => {
            state.coupon = action.payload;
        },
        removeCouponAppliedOnCart: (state, action: PayloadAction) => {
            state.coupon = initialCouponState;
        }
    }
});

const findItemOnCart = (shoppingCart: ShoppingCart, itemId: number) => {
    var currentCartItems = shoppingCart.items;
    return currentCartItems.find(e => e.id === itemId);
}

const removeItemFromCart = (shoppingCart: ShoppingCart, item: ShoppingCartItem) => {
    var currentCartItems = shoppingCart.items;
    currentCartItems = currentCartItems.filter(i => i.id !== item.id)
    shoppingCart.items = currentCartItems;
}

export const { addItemToCart, increaseItemQuantity, decreaseItemQuantity, applyCouponOnCart, removeCouponAppliedOnCart } = cartSlice.actions

export const selectQuantity = (state: RootState) => state.shoppingCart.items.reduce<number>((accumulator, item) => accumulator + item.quantity, 0)

export const hasAppliedCoupon = (state: RootState) => state.shoppingCart.coupon.triedToApply && state.shoppingCart.coupon.appliedWithSuccess;
export const getAppliedCoupon = (state: RootState) => {
    const couponMeta = state.shoppingCart.coupon.meta;
    return new Coupon(couponMeta?.id || 0, couponMeta?.fee || 0, couponMeta?.code || "");
}

export const selectProductsAmount = (state: RootState) => {
    let productsAmount = state.shoppingCart.items.reduce<number>((accumulator, item) => accumulator + (item.price.amount * item.quantity), 0);
    return new Money(productsAmount);
}

export const selectFinalAmount = (state: RootState) => {
    let finalAmount = state.shoppingCart.items.reduce<number>((accumulator, item) => accumulator + (item.price.amount * item.quantity), 0);

    if (hasAppliedCoupon(state))
    {
        const appliedCoupon = getAppliedCoupon(state);
        finalAmount = appliedCoupon?.applyOverAmount(finalAmount) || finalAmount;
    }

    return new Money(finalAmount);
}

export default cartSlice.reducer;