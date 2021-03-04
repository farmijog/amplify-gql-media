import React, { useContext, useEffect, useReducer } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Avatar, Card, CardHeader, CardContent, CardActions, CircularProgress as Loading, 
    Grid, Typography 
} from "@material-ui/core";
import moment from "moment";

import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { AppContext } from "../../context/AppProvider";
import PostNotFound from "./PostNotFound";
import CommentForm from "./comment/CommentForm";
import CommentCard from "./comment/CommentCard";
import LikeButton from "./like/LikeButton";

const initialState = { loading: true, postDetail: {} }

function postReducer(state, action) {
    switch(action.type) {
        case "FETCH_POST":
            return { ...state, postDetail: action.post, loading: false }
        case "POST_NOT_FOUND":
            return { ...state, postDetail: action.post, loading:false }
        case "ADD_COMMENT":
            return { 
                ...state,
                postDetail: {
                    ...state.postDetail,
                    comments: {
                        ...state.postDetail.comments,
                        items: [...state.postDetail.comments.items, action.comment] 
                    }
                } 
            }
        case "ADD_LIKE":
            return {
                ...state,
                postDetail: {
                    ...state.postDetail,
                    likes: {
                        ...state.postDetail.likes,
                        items: [...state.postDetail.likes.items, action.like]
                    }
                }
            }
        case "DELETE_COMMENT":
            return {
                ...state,
                postDetail: {
                    ...state.postDetail,
                    comments: {
                        ...state.postDetail.comments,
                        items: state.postDetail.comments.items.filter((comment) => comment.id !== action.id)
                    }
                }
            }
        case "DELETE_LIKE":
            return {
                ...state,
                postDetail: {
                    ...state.postDetail,
                    likes: {
                        ...state.postDetail.likes,
                        items: state.postDetail.likes.items.filter((like) => like.id !== action.id)
                    }
                }
            }
        default:
            return state
    }
}

function PostDetail({ match }) {
    const { id } = match.params;
    const { user } = useContext(AppContext);
    const [state, dispatch] = useReducer(postReducer, initialState);

    useEffect(() => {
        getPostDetail(id);
        subscriptionOnCreateComment();
        subscriptionOnDeleteComment();
        subscriptionOnLikePost();
        subscriptionOnUnlikePost();
    }, []);

    const subscriptionOnLikePost = () => {
        try {
            const subscription = API.graphql(graphqlOperation(subscriptions.onCreateLike)).subscribe({
                next: ({ value }) => {
                    const result = value.data.onCreateLike
                    dispatch({ type: "ADD_LIKE", like: result });
                }
            })
            return () => subscription.unsubscribe();
        } catch (error) {
            console.log("error on subscription onLikePost: ", error)
        }
    }

    const subscriptionOnUnlikePost = () => {
        try {
            const subscription = API.graphql(graphqlOperation(subscriptions.onDeleteLike)).subscribe({
                next: ({ value }) => {
                    const { id } = value.data.onDeleteLike
                    dispatch({ type: "DELETE_LIKE", id: id });
                }
            })
            return () => subscription.unsubscribe();
        } catch (error) {
            console.log("error on subscription onLikePost: ", error)
        }
    }

    const subscriptionOnCreateComment = () => {
        try {
            const subscription = API.graphql(graphqlOperation(subscriptions.onCreateComment)).subscribe({
                next: ({ value }) => {
                    const result = value.data.onCreateComment
                    dispatch({ type: "ADD_COMMENT", comment: result });
                }
            })
            return () => subscription.unsubscribe();
        } catch (error) {
            console.log("error on subscription onCreateComment: ", error)
        }
    }

    const subscriptionOnDeleteComment = () => {
        try {
            const subscription = API.graphql(graphqlOperation(subscriptions.onDeleteComment)).subscribe({
                next: ({ value }) => {
                    const { id } = value.data.onDeleteComment
                    dispatch({ type: "DELETE_COMMENT", id: id });
                }
            })
            return () => subscription.unsubscribe();
        } catch (error) {
            console.log("error on subscription onDeleteComment: ", error);
        }
    }

    const getPostDetail = async (id) => {
        try {
            const post = await API.graphql(graphqlOperation(queries.getPost, { id: id }));
            const postFromApi = post.data.getPost
            if (postFromApi === null) {
                dispatch({ type: "POST_NOT_FOUND", post: postFromApi })
            } else {
                if (postFromApi.image !== null) {
                    const image = await Storage.get(postFromApi.image, { download: false });
                    postFromApi.image = image;
                }
                dispatch({ type: "FETCH_POST", post: postFromApi });
            }

        } catch (error) {
            console.log("Error while fetching post: ", error);
        }
    }

    return (
        <div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                style={{ marginTop: 10 }}
            >
                {state.loading ? (
                    <Loading />
                ):(
                    !state.postDetail ? (
                        <PostNotFound />
                    ) : (
                        <Grid 
                            item style={{ width: "100%", maxWidth: 600 }}
                        >
                            <Card variant="outlined" elevation={3} style={{ marginBottom: 15 }} >
                                <CardHeader avatar={<Avatar />} title={state.postDetail.createdBy} />
                                <CardContent>
                                    {state.postDetail.message && (
                                        <Typography variant="h5">
                                            {state.postDetail.message}
                                        </Typography>
                                    )}
                                </CardContent>
                                {state.postDetail.image && (
                                    <img src={state.postDetail.image} 
                                        style={{ height: "100%", width: "100%", objectFit: "contain" }}  alt=""
                                    />
                                )}
                                <CardActions style={{ paddingLeft: 15 }}>
                                    <Typography variant="body2">
                                        {moment(state.postDetail.createdAt).format("h:mm a - DD MMMM YYYY")}
                                    </Typography>
                                </CardActions>
                                <CardActions style={{ paddingLeft: 15 }} >
                                    <Typography variant="caption"> {state.postDetail.likes.items.length} likes </Typography>
                                    <Typography variant="caption"> {state.postDetail.comments.items.length} comments </Typography>
                                </CardActions>
                                <CardActions>
                                    <LikeButton userLoggedIn={user ? user.username : null} 
                                        postId={state.postDetail.id} likes={state.postDetail.likes.items}
                                    />
                                </CardActions>
                            </Card>
                            <CommentForm postId={state.postDetail.id} />
                            {state.postDetail.comments.items.map((comment, index) => (
                                <div key={index}>
                                    <CommentCard 
                                        comment={comment}
                                        userLoggedIn={user ? user.username : null }
                                    />
                                </div>
                            ))}
                        </Grid>
                    )
                )}
            </Grid>
        </div>
    );
}

export default PostDetail;