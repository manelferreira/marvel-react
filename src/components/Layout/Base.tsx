import Container from '@mui/material/Container';
import TopBar from "./TopBar";
import { Fragment } from 'react';
import ComicsPage from '../../pages/ComicsPage';
import { Route, Routes } from 'react-router-dom';
import ComicPage from '../../pages/ComicPage';
import ShoppingCartPage from '../../pages/ShoppingCartPage';
import CouponsPage from '../../pages/CouponsPage';

export default function Base() {
    return (
        <Fragment>
            <TopBar />
            <Container>
                <Routes>
                    <Route path="/" element={<ComicsPage />} />
                    <Route path="/comic/:id" element={<ComicPage />} />
                    <Route path="/shoppingCart" element={<ShoppingCartPage />} />
                    <Route path="/coupons" element={<CouponsPage />} />
                </Routes>
            </Container>
        </Fragment>
    );
}