import React from "react";
import { Avatar, Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import moment from "moment"

function CommentDetail({ comment }) {
    return (
        <div>
            <Card variant="outlined" elevation={3} style={{ marginBottom: 5 }}>
                <CardHeader 
                    avatar={<Avatar />}
                    title={comment.createdBy}
                    subheader={moment(comment.createdAt).fromNow()}
                />
                <CardContent>
                    <Typography variant="body2">
                        {comment.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default CommentDetail;