import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import ThemeToggle from "./ThemeToggle";
import DropMenu from "./DropMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    toolbar: {
        minHeight: 40
    },
    navbutton: {
        textTransform: "none"
    }
}));

function NavBar() {
    const history = useHistory();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Button 
                        color="inherit" 
                        onClick={() => history.push("/home")} 
                        style={{ backgroundColor: "transparent", textTransform: "none" }}
                        disableRipple
                    >
                        Home
                    </Button>
                    <Typography className={classes.title}>

                    </Typography>
                    <ThemeToggle />
                    <DropMenu />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;