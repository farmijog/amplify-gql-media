import React from "react";
import { Button, Card, TextField } from "@material-ui/core";

function PostForm() {
    return (
        <div>
            <div style={{ margin: 7}}> 
                <TextField fullWidth variant="outlined" />
                <br/>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ float: "right", borderRadius: 50, textTransform: "none", marginTop: 5 }}
                >
                    Post
                </Button>
            </div>
        </div>
    );
}

export default PostForm;