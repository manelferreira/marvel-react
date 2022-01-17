import ComicSummary from "../../models/ComicSummary";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import AddBuyableItemToCartDiv from "../ShoppingCart/AddBuyableItemToCartDiv";
import RareComicBadge from "./RareComicBadge";
import ComicPrimaryInfo from "./ComicPrimaryInfo";

const ComicSummaryGridItem : React.FC<{comic: ComicSummary}> = (props) => {
    let navigate = useNavigate();

    const clickedOnComicHandler = () => {
        navigate(`../comic/${props.comic.id}`);
    }

    return (
        <Card variant="outlined">
            <CardMedia
                component="img"
                height="250px"
                image={props.comic.imageUrl}
                onClick={clickedOnComicHandler}
            />
            <CardContent>
                <ComicPrimaryInfo name={props.comic.name} isRare={props.comic.isRare} />
                <Typography variant="body2" color="text.secondary">
                    {props.comic.description}
                </Typography>
            </CardContent>
            <CardActions>
                <AddBuyableItemToCartDiv buyable={props.comic} />
            </CardActions>
        </Card>
    )
}




export default ComicSummaryGridItem;