import { Chip, Typography } from "@mui/material";
import StarsIcon from '@mui/icons-material/Stars';
import styled from "styled-components";

const ComicPrimaryInfo : React.FC<{name: string, isRare: boolean}> = (props) => {
    return (
        <InfoContainer>
            <Typography gutterBottom variant="h5">
                {props.name}
            </Typography>
            { props.isRare && <Chip
              icon={<StarsIcon />}
              label="Raridade"
              color="error" /> }
        </InfoContainer>
    )
}

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export default ComicPrimaryInfo;