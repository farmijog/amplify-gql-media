import React from "react";
import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";

import ThemeToggle from "./ThemeToggle";

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
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Button color="inherit" >
                        Home
                    </Button>
                    <Typography className={classes.title}>

                    </Typography>
                    <ThemeToggle />
                    <Button href="/signin" className={classes.navbutton} color="inherit">
                        Sign in
                    </Button>
                    <Button href="/signup" className={classes.navbutton} color="inherit">
                        Sign up
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;