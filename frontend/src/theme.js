import {createMuiTheme} from '@material-ui/core/styles';
import {pink, purple, lightBlue} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            elight: pink[50],
            light: pink[200],
            main: pink[500],
            dark: pink[800],
        },
        secondary: {
            elight:lightBlue[50],
            light: lightBlue[200],
            main: lightBlue[500],
            dark: lightBlue[800],
        },
    },
    typography: {
        fontFamily: "Roboto",
    },
    shape: {
        borderRadius: 8,
    }
});

export default theme;