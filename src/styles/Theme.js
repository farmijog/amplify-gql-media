import { createMuiTheme } from "@material-ui/core";

const light = {
    typography: {
        fontFamily: "Google Sans, Arial"
    },
    palette: {
        type: "light"
    }
}

const dark = {
    typography: {
        fontFamily: "Google Sans, Arial"
    },
    palette: {
        type: "dark"
    }
}

const lightTheme = createMuiTheme(light);
const darkTheme = createMuiTheme(dark);

export default { lightTheme, darkTheme }
