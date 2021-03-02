import React, { useContext, useEffect, useState } from "react";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { Avatar, Card, CardHeader, CardContent, CardActions, CircularProgress as Loading,  Grid, Typography } from "@material-ui/core";
import moment from "moment";

import * as queries from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { AppContext } from "../../context/AppProvider";
import PostNotFound from "./PostNotFound";
import CommentForm from "./comment/CommentForm";
import CommentCard from "./comment/CommentCard";
import LikeButton from "./like/LikeButton";

function PostDetail({ match }) {
    const { id } = match.params;
    const { user } = useContext(AppContext);
    const [loadingPost, setLoadingPost] = useState(true);
    const [postDetail, setPostDetail] = useState({});

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
                    const { post: { id } } = value.data.onCreateLike
                    getPostDetail(id);
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
                    const { post: { id } } = value.data.onDeleteLike
                    getPostDetail(id);
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
                    const { post: { id } } = value.data.onCreateComment
                    getPostDetail(id)
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
                    const { post: { id } } = value.data.onDeleteComment
                    getPostDetail(id);
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
            if (postFromApi.image) {
                const image = await Storage.get(postFromApi.image, { download: false });
                postFromApi.image = image;
            }
            postFromApi !== null ? setPostDetail(postFromApi) : setPostDetail(null);
        } catch (error) {
            console.log("Error while fetching post: ", error);
        }
        setLoadingPost(false)
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
                {loadingPost ? (
                    <Loading />
                ):(
                    !postDetail ? (
                        <PostNotFound />
                    ) : (
                        <Grid 
                            item style={{ width: "100%", maxWidth: 600 }}
                        >
                            <Card variant="outlined" elevation={3} style={{ marginBottom: 15 }} >
                                <CardHeader avatar={<Avatar />} title={postDetail.createdBy} />
                                <CardContent>
                                    {postDetail.message && (
                                        <Typography variant="h5">
                                            {postDetail.message}
                                        </Typography>
                                    )}
                                </CardContent>
                                {postDetail.image && (
                                    <img src={postDetail.image} 
                                        style={{ height: "100%", width: "100%", objectFit: "contain" }}  alt=""
                                    />
                                )}
                                <CardActions style={{ paddingLeft: 15 }}>
                                    <Typography variant="body2">
                                        {moment(postDetail.createdAt).format("h:m a - DD MMMM YYYY")}
                                    </Typography>
                                </CardActions>
                                <CardActions style={{ paddingLeft: 15 }} >
                                    <Typography variant="caption"> {postDetail.likes.items.length} likes </Typography>
                                    <Typography variant="caption"> {postDetail.comments.items.length} comments </Typography>
                                </CardActions>
                                <CardActions>
                                    <LikeButton userLoggedIn={user ? user.username : null} 
                                        postId={postDetail.id} likes={postDetail.likes.items}
                                    />
                                </CardActions>
                            </Card>
                            <CommentForm postId={postDetail.id} />
                            {postDetail.comments.items.map((comment, index) => (
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