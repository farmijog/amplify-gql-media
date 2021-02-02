import { createMuiTheme } from "@material-ui/core";

const dark = {
    typography: {
        fontFamily: "Google Sans, Arial"
    },
    palette: {
        type: "dark"
    }
}

export const darkTheme = createMuiTheme(dark)