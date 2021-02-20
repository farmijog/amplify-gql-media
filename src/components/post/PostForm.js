import React, { useState } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Button, CircularProgress as Loading, IconButton, TextField } from "@material-ui/core";
import { ImageSearch } from "@material-ui/icons";

import * as mutations from "../../graphql/mutations";

function PostForm() {
    const [imgFile, setImgFile] = useState(null);
    const [postData, setPostData] = useState({ message: "" });
    const [postLoading, setPostLoading] = useState(false);

    const onChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const onChangeImg = async (e) => {
        if (!e.target.files[0]) return;
        const file = e.target.files[0];
        setPostData({ ...postData, image: file.name });
        setImgFile(file);
    }

    const createPost = async () => {
        try {
            setPostLoading(true)
            await API.graphql(graphqlOperation(mutations.createPost, { input: postData }))
            if (imgFile !== null) {
                await Storage.put(postData.image, imgFile)
                setImgFile(null);
            }
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
                <IconButton component="label">
                    <ImageSearch />
                    <input type="file" accept="image/*" onChange={onChangeImg} hidden />
                </IconButton>
                {/* <Button variant="contained" size="small" style={{ textTransform: "none" }}
                    onClick={() => console.log("postData: ", postData, "imgFile: ", imgFile)}
                >
                    test log
                </Button> */}
                {postLoading ? (
                    <Loading style={{ float: "right" }} />        
                ) : (
                    <Button
                    disabled={postData.message.trim() === "" && !postData.image ? true : false}
                    onClick={createPost}
                    variant="contained" 
                    color="primary" 
                    style={{ float: "right", borderRadius: 50, textTransform: "none", marginTop: 10 }}
                >
                    Post
                </Button>
                )}
            </div>
        </div>
    );
}

export default PostForm;