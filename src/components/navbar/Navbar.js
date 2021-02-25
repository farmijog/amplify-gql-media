import React, { useContext } from "react";
import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";

import { AppContext } from "../../context/AppProvider";
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
    const { user } = useContext(AppContext);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Button color="inherit" href="/home">
                        Home
                    </Button>
                    <Typography className={classes.title}>

                    </Typography>
                    <ThemeToggle />
                    {user ? (
                        <Typography variant="body2">
                            {user.username}
                        </Typography>                        
                    ) : (
                        <Typography>
                        <Button href="/signin" className={classes.navbutton} color="inherit">
                            Sign in
                        </Button>
                        <Button href="/signup" className={classes.navbutton} color="inherit">
                            Sign up
                        </Button>
                        </Typography>
                    )}
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;