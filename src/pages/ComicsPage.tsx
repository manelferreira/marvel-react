import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ComicSummary from "../models/ComicSummary";
import getComics  from "../integrations/marvel/getComicsIntegration";
import PageInfo from "../models/PageInfo";
import ComicSummaryGridItem from "../components/Comics/ComicSummaryGridItem";
import Paginator from "../components/Layout/Paginator";
import { Typography } from "@mui/material";
import LoadingBackdrop from "../components/Layout/LoadingBackdrop";

const ComicsPage = () => {
    const [comics, setComics] = useState<ComicSummary[]>([])
    const [pageInfo, setPageInfo] = useState<PageInfo>(new PageInfo(0, 0, 0));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchComicsPage()
    }, [])

    async function fetchComicsPage(page: number = 0) {
        setIsLoading(true);
        var comicsPage = await getComics(page);
        setComics(comicsPage.items);
        setPageInfo(comicsPage.pageInfo);
        setIsLoading(false);
    }

    const changePageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchComicsPage(value);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <LoadingBackdrop isLoading={isLoading} />
            <Typography variant="h5" gutterBottom component="div" sx={{ mb: "1rem" }}>
                Lista de quadrinhos
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {
                comics.map(comic => (
                    <Grid key={comic.id} item xs={6} sx={{height: "100%"}}>
                        <ComicSummaryGridItem comic={comic}></ComicSummaryGridItem>
                    </Grid>
                ))
            }
            </Grid>

            <Paginator pageInfo={pageInfo} onChangePage={changePageHandler}></Paginator>
        </Box>
    )
}

export default ComicsPage;