import React, { useContext, useEffect, useReducer } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { CircularProgress as Loading, Grid } from "@material-ui/core";

import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions"
import { AppContext } from "../../context/AppProvider";
import PostCard from "../post/PostCard";
import PostForm from "../post/PostForm";

const initialState = {
    loading: true, posts: []
}

function reducer(state, action) {
    switch(action.type) {
        case "SET_POSTS":
            return { ...state, posts: action.posts, loading: false }
        case "LIKE_POST":
            return { 
                ...state, 
                posts: state.posts.map((post) => post.id === action.like.post.id ? {
                    ...post,
                    likes: {
                        ...post.likes,
                        items: [...post.likes.items, action.like]
                    }
                } : post)
            }
        case "UNLIKE_POST":
            return { ...state,
                posts: state.posts.map((post) => post.id === action.unlike.post.id ? {
                    ...post,
                    likes: {
                        ...post.likes,
                        items: post.likes.items.filter((like) => like.id !== action.unlike.id )
                    }
                } : post)
            }
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
        subscriptionOnLikePost();
        subscriptionOnUnlikePost();
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

    const subscriptionOnLikePost = () => {
        try {
            const subscription = API.graphql(graphqlOperation(subscriptions.onCreateLike)).subscribe({
                next: ({ value }) => {
                    const result = value.data.onCreateLike
                    dispatch({ type: "LIKE_POST", like: result });
                }
            })
            return () => subscription.unsubscribe();
        } catch (error) {
            console.log("error while sub to like post: ", error)
        }
    }

    const subscriptionOnUnlikePost = () => {
        try {
            const subscription = API.graphql(graphqlOperation(subscriptions.onDeleteLike)).subscribe({
                next: ({ value }) => {
                    const result = value.data.onDeleteLike
                    dispatch({ type: "UNLIKE_POST", unlike: result });
                }
            })
            return () => subscription.unsubscribe();
        } catch (error) {
            console.log("error while sub to unlike post: ", error)
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
                        state.loading ? (
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