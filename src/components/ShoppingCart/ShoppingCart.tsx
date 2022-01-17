import styled from "styled-components";

const ShoppingCart : React.FC = (props) => {
    return (
        <CartContainer>
           { props.children }
        </CartContainer>
    )
}

const CartContainer = styled.div`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    align-items: flex-start;
`

export default ShoppingCart;