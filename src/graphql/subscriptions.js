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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      message
      createdBy
      post {
        id
        createdBy
        message
        comments {
          items {
              id message createdBy createdAt
          }
        }
        likes {
          items {
              id createdAt createdBy
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      createdBy
      post {
        id
        createdBy
        message
        comments {
          items {
              id message createdBy createdAt
          }
        }
        likes {
            items {
                id createdAt createdBy
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
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
