import React, { useEffect, useState } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Avatar, Card, CardHeader, CardContent, CardActions, CircularProgress as Loading, 
    IconButton, Grid, Typography 
} from "@material-ui/core";
import { FavoriteBorder, QuestionAnswer } from "@material-ui/icons";
import { red, blue } from "@material-ui/core/colors";
import moment from "moment";

import * as queries from "../../graphql/queries";

function PostDetail({ match }) {
    const { id } = match.params;
    const [loadingPost, setLoadingPost] = useState(true);
    const [postDetail, setPostDetail] = useState();

    useEffect(() => {
        if (!postDetail) {
            getPostDetail(id)
        }
    }, [])

    const getPostDetail = async (id) => {
        try {
            const post = await API.graphql(graphqlOperation(queries.getPost, { id: id }));
            post.data.getPost !== null ? setPostDetail(post.data.getPost) : setPostDetail(null);
            console.log(post)
        } catch (error) {
            console.log("Error while fetching post: ", error);
        }
        setLoadingPost(false)
    }

    return (
        <div>
            {loadingPost ? (
                <Loading />
            ):(
                !postDetail ? (
                    <h1>post not found</h1>
                ) : (
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                        style={{ marginTop: 10 }}
                    >
                        <Grid 
                            item style={{ width: "100%", maxWidth: 600 }}
                        >
                            <Card variant="outlined" elevation={3} >
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
                                    <Typography variant="caption"> 12 likes </Typography>
                                    <Typography variant="caption"> {postDetail.comments.items.length} comments </Typography>
                                </CardActions>
                                <CardActions>
                                    <IconButton>
                                        <FavoriteBorder style={{ color: red[500] }} />
                                    </IconButton>
                                    <IconButton>
                                        <QuestionAnswer style={{ color: blue[500] }} />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                )
            )}
        </div>
    );
}

export default PostDetail;