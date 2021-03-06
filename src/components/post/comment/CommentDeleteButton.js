import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { CircularProgress as Loading, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";

import * as mutations from "../../../graphql/mutations";

function CommentDeleteButton({ commentId }) {
    const [loadingCommentAction, setLoadingCommentAction] = useState(false)
    const [openMenu, setOpenMenu] = useState(null);

    const handleClick = (e) => {
        setOpenMenu(e.currentTarget);
    }

    const handleClose = () => {
        setOpenMenu(null);
    }

    const deleteCommentFromPost = async () => {
        try {
            setLoadingCommentAction(true);
            handleClose();
            await API.graphql(graphqlOperation(mutations.deleteComment, { input: { id: commentId } }));
        } catch (error) {
            console.log("Error while trying to delete the comment: ", error);
        }
        setLoadingCommentAction(false);
    }

    return (
        <div>
            {loadingCommentAction ? (
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
                        <MenuItem onClick={deleteCommentFromPost}>
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

export default CommentDeleteButton;