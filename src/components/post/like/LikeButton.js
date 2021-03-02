import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { IconButton } from "@material-ui/core";
import { Favorite as LikedIcon, FavoriteBorder as LikeIcon } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

import * as mutations from "../../../graphql/mutations";

function LikeButton({ postId, likes, userLoggedIn }) {

    const [liked, setLiked] = useState(false);
    const like = likes.find(like => like.createdBy === userLoggedIn);

    useEffect(() => {
        if (userLoggedIn && likes.find(like => like.createdBy === userLoggedIn)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [userLoggedIn, likes]);

    const likePostClick = (e) => {
        e.stopPropagation();
        setLiked(true);
        likeOnPost();
    }

    const unlikePostClick = (e) => {
        e.stopPropagation();
        setLiked(false);
        unlikeOnPost();
    }

    const likeOnPost = async () => {
        try {
            await API.graphql(graphqlOperation(mutations.createLike, { input: { likePostId: postId } }));
            console.log("Post liked!");
        } catch (error) {
            console.log("Error while trying to like the post: ", error);
        }
    }

    const unlikeOnPost = async () => {
        try {
            await API.graphql(graphqlOperation(mutations.deleteLike, { input: { id: like.id } }))
            console.log("Post unliked!");
        } catch (error) {
            console.log("Error while trying to unlike the post: ", error);
        }
    }

    return (
        <div>
            {userLoggedIn ? (
                liked ? (
                    <IconButton onClick={unlikePostClick}>
                        <LikedIcon style={{ color: red[500] }} />
                    </IconButton>
                ) : (
                    <IconButton onClick={likePostClick} >
                        <LikeIcon style={{ color: red[500] }} />
                    </IconButton>
                )
            ) : (
                <IconButton href="/signin">
                    <LikeIcon style={{ color: red[500] }} />
                </IconButton>
            )}
        </div>
    );
}

export default LikeButton;