import { Chip } from "@mui/material";
import StarsIcon from '@mui/icons-material/Stars';

const RareComicBadge = () => {
    return (
        <Chip
              icon={<StarsIcon />}
              label="Raridade"
              color="error" />
    )
}

export default RareComicBadge;