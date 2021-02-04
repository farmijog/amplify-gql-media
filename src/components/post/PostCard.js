import React from "react";
import {
    Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, Typography
} from "@material-ui/core";
import { red, blue } from "@material-ui/core/colors";
import { FavoriteBorder, QuestionAnswer } from "@material-ui/icons";
import moment from "moment";

function PostCard({ post }) {
    return (
        <div>
            <Card variant="outlined" elevation={3}>
                <CardHeader
                    avatar={<Avatar />}
                    title={post.createdBy}
                    subheader={moment(post.createdAt).fromNow()}
                />
                <CardContent>
                    <Typography>
                        {post.message}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton>
                        <FavoriteBorder style={{ color: red[500] }} />
                    </IconButton>
                    <IconButton>
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