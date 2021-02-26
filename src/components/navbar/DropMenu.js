import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { AccountCircle, ArrowDropDown, ExitToApp, Settings } from "@material-ui/icons";

import { AppContext } from "../../context/AppProvider";

function DropMenu() {
    const history = useHistory();
    const { user, setUserContext } = useContext(AppContext);
    const [openMenu, setOpenMenu] = useState(null);

    const handleClick = (e) => {
        setOpenMenu(e.currentTarget);
    };

    const handleClose = () => {
        setOpenMenu(null);
    }

    const signOut = async () => {
        try {
            await Auth.signOut();
            setUserContext(null);
            handleClose();
        } catch (error) {
            console.log("Error while signing out: ", error);
        }
    }

    return (
        <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <ArrowDropDown fontSize="small" />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={openMenu}
                keepMounted
                open={Boolean(openMenu)}
                onClose={handleClose}
                getContentAnchorEl={null}
                style={{ width: 200 }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                {user ? (
                    <div>
                        <MenuItem>
                            <Button
                                size="small"
                                disableRipple
                                style={{ 
                                    backgroundColor: "transparent", 
                                    textTransform: "none",
                                }} 
                            >
                                <AccountCircle /> &nbsp;
                                {user.username}
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button
                                size="small"
                                disableRipple
                                style={{ 
                                    backgroundColor: "transparent", 
                                    textTransform: "none",
                                }} 
                            >
                                <Settings /> &nbsp;
                                Settings
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button
                                onClick={signOut}
                                href="/signin"
                                size="small"
                                disableRipple
                                style={{ 
                                    backgroundColor: "transparent", 
                                    textTransform: "none",
                                }} 
                            >
                                <ExitToApp /> &nbsp;
                                Signout
                            </Button>
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem>
                            <Button
                                onClick={handleClose}
                                href="/signin"
                                size="small"
                                disableRipple
                                style={{ 
                                    backgroundColor: "transparent", 
                                    textTransform: "none",
                                }} 
                            >
                                Sign in
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button
                                onClick={handleClose}
                                href="/signup"
                                size="small"
                                disableRipple
                                style={{ 
                                    backgroundColor: "transparent", 
                                    textTransform: "none",
                                }} 
                            >
                                Sign up
                            </Button>
                        </MenuItem>
                        
                    </div> 
                )}
            </Menu>
        </div>
    );
}

export default DropMenu;