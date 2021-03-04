/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      createdBy
      message
      comments {
        items {
          id
          message
          createdBy
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          createdBy
          createdAt
          updatedAt
        }
        nextToken
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      createdBy
      message
      comments {
        items {
          id
          message
          createdBy
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          createdBy
          createdAt
          updatedAt
        }
        nextToken
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      createdBy
      message
      comments {
        items {
          id
          message
          createdBy
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          createdBy
          createdAt
          updatedAt
        }
        nextToken
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      message
      createdBy
      post {
        id
        createdBy
        message
        comments {
          items {
              id message createdAt createdBy
          }
        }
        likes {
          items {
              id createdBy createdAt
          }
        }
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      message
      createdBy
      post {
        id
        createdBy
        message
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      message
      createdBy
      post {
        id
        createdBy
        message
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      createdBy
      post {
        id
        createdBy
        message
        comments {
          items {
              id message createdAt createdBy
          }
        }
        likes {
          items {
              id createdBy createdAt
          }
        }
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      createdBy
      post {
        id
        createdBy
        message
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      createdBy
      post {
        id
        createdBy
        message
        comments {
          items {
              id message createdAt createdBy
          }
        }
        likes {
          items {
              id createdBy createdAt
          }
        }
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
