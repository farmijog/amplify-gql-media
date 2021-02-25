import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { CircularProgress as Loading, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";

import * as mutations from "../../graphql/mutations";

function PostDeleteButton({ postId }) {
    const [loadingPostAction, setLoadingPostAction] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const handleClick = (e) => {
        e.stopPropagation();
        setOpenMenu(e.currentTarget);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setOpenMenu(null)
    };

    const deletePostOption = async (e) => {
        try {
            e.stopPropagation();
            setOpenMenu(null);
            setLoadingPostAction(true);
            await API.graphql(graphqlOperation(mutations.deletePost, { input: { id: postId } }));
            console.log("Post deleted");
        } catch (error) {
            console.log("Error while trying to delete the post: ", error);
        }
        setLoadingPostAction(false)
    }

    return (
        <div>
            {loadingPostAction ? (
                <Loading />
            ) : (
                <>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreHoriz />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={openMenu}
                        keepMounted
                        open={Boolean(openMenu)}
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        <MenuItem onClick={deletePostOption}>
                            <Typography variant="body2">
                                Delete
                            </Typography>
                        </MenuItem>
                    </Menu>
                </>
            )}
        </div>
    );
}

export default PostDeleteButton;