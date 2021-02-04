import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Button, CircularProgress, Grid } from "@material-ui/core";

import * as queries from "../../graphql/queries";
import PostCard from "../post/PostCard";
import PostForm from "../post/PostForm";


function Home() {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState();

    useEffect(() => {
        checkIfUserExists();
        fetchPosts();
    }, [])

    const checkIfUserExists = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
            // console.log(user);
        } catch (error) {
            
        }
    }

    const fetchPosts = async () => {
        try {
            const postData = await API.graphql(graphqlOperation(queries.listPosts));
            // console.log("post-data: ", postData);
            setPosts(postData);
        } catch (error) {
            console.log("error while fetching posts: ", error);
        }
    }

    const signOutButton = async () => {
        try {
            await Auth.signOut();
            history.push("/signin");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        user && (
            <div >
                <h1>Welcome back, {user.username}! </h1>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={signOutButton} 
                    style={{ borderRadius: 50, textTransform: "none", marginBottom: 15 }}
                >Sign Out</Button>
                <Grid 
                    container 
                    direction="column" 
                    justify="center" 
                    alignItems="center"
                    spacing={2} 
                >
                    <div style={{ width: "100%", maxWidth: 600 }}>
                        <PostForm  />
                    </div>
                    
                    {!posts ? (
                        <CircularProgress />
                    ) : (
                        posts.data.listPosts.items.map((post) => (
                        <Grid item key={post.id} style={{ width: "100%", maxWidth: 600 }} >
                            <PostCard post={post} />        
                        </Grid>    
                        ))
                    )}
                </Grid>
            </div>
        )
    );

}

export default Home;