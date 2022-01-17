import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import Comic from '../models/Comic';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getComicById from '../integrations/marvel/getComicByIdIntegration';
import AddBuyableItemToCartDiv from '../components/ShoppingCart/AddBuyableItemToCartDiv';
import ComicPrimaryInfo from '../components/Comics/ComicPrimaryInfo';
import LoadingBackdrop from '../components/Layout/LoadingBackdrop';

const ComicPage = () => {
    const { id } = useParams<{ id: string }>();

    const [comic, setComic] = useState<Comic>(new Comic(0, "", "", 1, ""))
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        fetchComic()
    }, [])

    async function fetchComic() {
        setIsLoading(true);
        var comic = await getComicById(id);
        setComic(comic);
        setIsLoading(false);
    }

    return (
        <StyledRowContainer>
            <LoadingBackdrop isLoading={isLoading} />
            <StyledComicImage>
                <Card>
                    <CardMedia
                        component="img"
                        image={comic.imageUrl}
                    />
                </Card>
            </StyledComicImage>
            <StyledComicDetails>
                <Card sx={{ minWidth: "100%" }}>
                    <ComicDetailsCardBody>
                        <CardContent sx ={{ minHeight: "75%" }}>
                            <ComicPrimaryInfo name={comic.name} isRare={comic.isRare} />
                            <Typography variant="body2" color="text.secondary">
                                {comic.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <AddBuyableItemToCartDiv buyable={comic} />
                        </CardActions>
                    </ComicDetailsCardBody>
                </Card>
            </StyledComicDetails>
        </StyledRowContainer>
    )
}

const StyledRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

const StyledComicImage = styled.div`
    display: flex;
    max-width: 40%;
`

const StyledComicDetails = styled.div`
    display: flex;
    align-content: stretch;
    flex-grow: 100;
`

const ComicDetailsCardBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
`


export default ComicPage;