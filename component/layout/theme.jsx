import { createMuiTheme } from '@material-ui/core/styles';
import { red, green, grey, blue, common } from '@material-ui/core/colors';


// Create a theme instance.
const theme = createMuiTheme({
    // direction: dir,
    typography: {
        fontSize: 15,
    },
    palette: {
        primary: {
            main: blue.A400,
        },
        secondary: {
            main: green.A400,
        },
        default: {
            main: blue.A400,
        },
        error: {
            main: red.A400,
        },
        background: {
            default: common.white,
        },
        light: common.white
    },
    overrides: {
        MuiFormControl: {
            root: {
                marginTop: '0.5rem',
                marginBottom: '0.5rem'
            }
        },        
        MuiDialog: {
            root: {
                alignItems: "flex-end"
            },
            container: {
                margin: 0,
                maxWidth: "100%",
                width: "100%"
            }
        }
    },    
});


export default theme;