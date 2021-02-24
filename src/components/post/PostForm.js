import React, { useState } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Button, CardMedia, CircularProgress as Loading, IconButton, makeStyles, TextField } from "@material-ui/core";
import { ImageSearch, Cancel } from "@material-ui/icons";

import * as mutations from "../../graphql/mutations";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: "56.25%"
    }
}))

function PostForm() {
    const classes = useStyles();
    const [imgFile, setImgFile] = useState(null);
    const [previewSource, setPreviewSource] = useState("");
    const [postData, setPostData] = useState({ message: "" });
    const [postLoading, setPostLoading] = useState(false);

    const onChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const onChangeImg = (e) => {
        if (!e.target.files[0]) return;
        const file = e.target.files[0];
        setPostData({ ...postData, image: file.name });
        setImgFile(file);
        displayPreview(file);
    }

    const displayPreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const discardImage = () => {
        setPostData({ message: "" });
        setImgFile(null)
        setPreviewSource("");
    }

    const createPost = async () => {
        try {
            setPostLoading(true)
            await API.graphql(graphqlOperation(mutations.createPost, { input: postData }))
            if (imgFile !== null) {
                await Storage.put(postData.image, imgFile)
                setImgFile(null);
                setPreviewSource("");
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
                {previewSource && (
                    <>
                        <IconButton style={{ float: "left" }} onClick={discardImage} >
                            <Cancel />
                        </IconButton>
                        <CardMedia className={classes.media} image={previewSource} />
                    </>
                )}
                <br/>
                <IconButton component="label">
                    <ImageSearch />
                    <input type="file" accept="image/*" onChange={onChangeImg} hidden />
                </IconButton>
                {/* <Button variant="contained" size="small" style={{ textTransform: "none" }}
                    onClick={() => console.log("postData: ", postData, "imgFile: ", imgFile, "preview: ", previewSource)}
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