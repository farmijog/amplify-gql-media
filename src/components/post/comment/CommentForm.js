import React, { useState } from "react";
import { CircularProgress as Loading, TextField, Button } from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";

import * as mutations from "../../../graphql/mutations";

function CommentForm({ postId }) {
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentData, setCommentData] = useState({ message: "", commentPostId: postId })

    const onChange = (e) => {
        setCommentData({ ...commentData, [e.target.name]: e.target.value });
    }

    const commentOnPost = async (e) => {
        e.preventDefault();
        try {
            setCommentLoading(true);
            await API.graphql(graphqlOperation(mutations.createComment, { input: commentData }));
            setCommentData({ message: "" });
            
        } catch (error) {
            console.log("Error while trying to comment to the post: ", error);
        }
        setCommentLoading(false);
    }

    return (
        <div style={{ height: 110 }}>
            <form noValidate>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder="Your comment..."
                    name="message"
                    value={commentData.message}
                    onChange={onChange}
                    style={{ marginBottom: 7 }}
                />
                {commentLoading ? (
                    <Loading style={{ float: "right" }} />
                ) : (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={commentOnPost}
                        style={{ borderRadius: 50, float: "right", textTransform: "none" }}
                        disabled={commentData.message.trim() === "" ? true : false}
                    >
                        Comment
                    </Button>
                )}
            </form>
        </div>
    );
}

export default CommentForm;