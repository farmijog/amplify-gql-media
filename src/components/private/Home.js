import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Button, CircularProgress, Grid } from "@material-ui/core";

import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions"
import PostCard from "../post/PostCard";
import PostForm from "../post/PostForm";

const initialState = {
    message: "", posts: []
}

function reducer(state, action) {
    switch(action.type) {
        case "SET_POSTS":
            return { ...state, posts: action.posts }
        case "SET_INPUT":
            return { ...state, [action.key]: action.value }
        case "CLEAR_INPUT":
            return { ...initialState, posts: state.posts }
        case "ADD_POST":
            return { ...state, posts: [...state.posts, action.post] }
        default:
            return state
    }
}

function Home() {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [posts, setPosts] = useState();

    useEffect(() => {
        checkIfUserExists();
        fetchPosts();
        const subscription = API.graphql(graphqlOperation(subscriptions.onCreatePost)).subscribe({
            next: ({ value }) => 
            {
                const post = value.data.onCreatePost
                dispatch({ type: "ADD_POST", post })
            }
        })
        return () => subscription.unsubscribe();
    }, [])

    const checkIfUserExists = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log("User: ", user)
            setUser(user);
        } catch (error) {
            
        }
    }

    const fetchPosts = async () => {
        try {
            const postData = await API.graphql(graphqlOperation(queries.listPosts));
            dispatch({ type: "SET_POSTS", posts: postData.data.listPosts.items })
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
                    {
                        !state.posts.length ? (
                            <CircularProgress />
                        ) : (
                            state.posts.map((post, index) => (
                                <Grid item key={index} style={{ width: "100%", maxWidth: 600 }} >
                                    <PostCard post={post} />        
                                </Grid>    
                                )
                            )
                        )
                    }
                </Grid>
            </div>
        )
    );

}

export default Home;