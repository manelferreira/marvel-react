import { Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop : React.FC<{ isLoading: boolean }> = (props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}


export default LoadingBackdrop;