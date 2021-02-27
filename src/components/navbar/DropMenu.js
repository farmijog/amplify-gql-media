import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
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
            history.push("/signin");
        } catch (error) {
            console.log("Error while signing out: ", error);
        }
    }

    return (
        <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <ArrowDropDown fontSize="small" style={{ color: "white"}} />
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
                            <AccountCircle />
                            <Typography style={{ marginLeft: 15 }} variant="body2">
                                {user.username}
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Settings /> 
                            <Typography style={{ marginLeft: 15 }} variant="body2">
                                Settings
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={signOut}>
                            <ExitToApp /> 
                            <Typography style={{ marginLeft: 15 }} variant="body2">
                                Sign out
                            </Typography>
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem onClick={() => { handleClose(); history.push("/signin"); }} >
                            <Typography variant="body2">
                                Sign in
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); history.push("/signup"); }} >
                            <Typography variant="body2">
                                Sign up
                            </Typography>
                        </MenuItem>
                    </div> 
                )}
            </Menu>
        </div>
    );
}

export default DropMenu;