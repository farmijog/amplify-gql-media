import React, { useContext, useState, useEffect, useReducer } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { CircularProgress as Loading, Grid } from "@material-ui/core";

import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions"
import { AppContext } from "../../context/AppProvider";
import PostCard from "../post/PostCard";
import PostForm from "../post/PostForm";

const initialState = {
    message: "", posts: []
}

function reducer(state, action) {
    switch(action.type) {
        case "SET_POSTS":
            return { ...state, posts: action.posts }
        // case "SET_INPUT":
        //     return { ...state, [action.key]: action.value }
        // case "CLEAR_INPUT":
        //     return { ...initialState, posts: state.posts }
        case "ADD_POST":
            return { ...state, posts: [...state.posts, action.post] }
        default:
            return state
    }
}

function Home() {
    const { user } = useContext(AppContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchPosts();
        const subscription = API.graphql(graphqlOperation(subscriptions.onCreatePost)).subscribe({
            next: ({ value }) => 
            {
                const post = value.data.onCreatePost
                // dispatch({ type: "ADD_POST", post })
                fetchPosts();
            }
        })
        return () => subscription.unsubscribe();
    }, [])

    const fetchPosts = async () => {
        try {
            const postData = await API.graphql(graphqlOperation(queries.listPosts));
            const postsFromAPI = postData.data.listPosts.items;
            await Promise.all(postsFromAPI.map(async post => {
                if (post.image) {
                    const image = await Storage.get(post.image);
                    post.image = image;
                }
            }))
            dispatch({ type: "SET_POSTS", posts: postData.data.listPosts.items })
        } catch (error) {
            console.log("error while fetching posts: ", error);
        }
    }

    return (
        user && (
            <div >
                <h1>Welcome back, {user.username}! </h1>
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
                            <Loading />
                        ) : (
                            state.posts.map((post, index) => (
                                <Grid item key={index} style={{ width: "100%", maxWidth: 600 }} >
                                    <PostCard post={post} userLoggedIn={user ? user.username : null} />        
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