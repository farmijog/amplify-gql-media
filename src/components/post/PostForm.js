import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import { CircularProgress as Loading } from "@material-ui/core";

import * as mutations from "../../graphql/mutations";

function PostForm() {
    const [postData, setPostData] = useState({ message: "" });
    const [postLoading, setPostLoading] = useState(false);

    const onChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const createPost = async () => {
        const { message } = postData;
        if (message === "") return;
        const post = { message }
        try {
            setPostLoading(true)
            await API.graphql(graphqlOperation(mutations.createPost, { input: post }))
            setPostData({ message: "" });
        } catch (error) {
            console.log("Error while trying to post: ", error);
        }
        setPostLoading(false)
    }

    return (
        <div>
            <div style={{ margin: 7}}> 
                <TextField 
                    fullWidth 
                    variant="outlined" 
                    placeholder="What's on your mind"
                    name="message"
                    onChange={onChange}
                    value={postData.message}
                    multiline
                    rowsMax={5}
                />
                <br/>
                {postLoading ? (
                    <Loading style={{ float: "right" }} />        
                ) : (
                    
                    <Button 
                    onClick={createPost}
                    variant="contained" 
                    color="primary" 
                    style={{ float: "right", borderRadius: 50, textTransform: "none", marginTop: 5 }}
                >
                    Post
                </Button>
                    
                )}
            </div>
        </div>
    );
}

export default PostForm;