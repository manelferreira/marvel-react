import styled from "styled-components";

const Logo = () => {
    return (
        <LogoDiv>
            <LogoImg src="/logo.png" />
        </LogoDiv>
    )
}

const LogoDiv = styled.div`
    display: flex;
    max-width: 160px;
    max-height: 100%;
    flex-grow: 1;
`

const LogoImg = styled.img`
    max-width: 100%;
    max-height: 100%;
`

export default Logo;