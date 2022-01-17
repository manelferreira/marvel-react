import Base from "./components/Layout/Base";
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000'
        },
        secondary: {
            main: '#EC1D24'
        }
    },
    typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`
    }
 });

function App() {
  return (
      <ThemeProvider theme = { theme }>
        <Base />
      </ThemeProvider>
  );
}

export default App;
