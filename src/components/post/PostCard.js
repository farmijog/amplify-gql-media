import React from "react";
import { useHistory } from "react-router-dom";
import {
    Avatar, Card, CardHeader, CardContent, CardActionArea, CardActions, CardMedia, IconButton, makeStyles, Typography
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { FavoriteBorder, QuestionAnswer } from "@material-ui/icons";
import moment from "moment";

import LikeButton from "./like/LikeButton";
import PostDeleteButton from "./PostDeleteButton";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: "56.25%"
    }
}));

function PostCard({ post, userLoggedIn }) {
    const history = useHistory();
    const classes = useStyles();
    return (
        <div 
            style={{ cursor: "pointer" }} 
            onClick={() => history.push(`/post/${post.id}`)}
        >
            <Card variant="outlined" elevation={3}>
                <CardHeader
                    avatar={<Avatar />}
                    title={post.createdBy}
                    subheader={moment(post.createdAt).fromNow()}
                    action={post.createdBy === userLoggedIn ? <PostDeleteButton postId={post.id} /> : ""}
                />
                <CardContent>
                    <Typography>
                        {post.message}
                    </Typography>
                </CardContent>
                {post.image && (
                    <CardMedia 
                        className={classes.media} image={post.image}
                    />
                )}
                <CardActions disableSpacing>
                    <LikeButton userLoggedIn={userLoggedIn} postId={post.id} likes={post.likes.items}   />
                    <Typography>
                        {post.likes.items.length}
                    </Typography>
                    <IconButton onClick={() => history.push(`/post/${post.id}`)} >
                        <QuestionAnswer style={{ color: blue[500] }} />
                    </IconButton>
                    <Typography>
                        {post.comments.items.length}
                    </Typography>
                </CardActions>
                
            </Card>
        </div>
    );
}

export default PostCard;