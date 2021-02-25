/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      message
      createdBy
      createdAt
      updatedAt
      post {
        id
        createdBy
        message
        image
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      message
      createdBy
      post {
        id
        createdBy
        message
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
