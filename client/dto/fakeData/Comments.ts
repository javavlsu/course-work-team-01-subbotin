import { Comment } from "dto/types/Comments"
import { Response } from "types/default"

export const CommentsFakeData: Response<Comment[]> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: [
    {
      id: 1,
      content: "Comment 1",
      createdAt: new Date().toDateString(),
      user: {
        id: "test_user_id",
        avatar:
            "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
        username: "Test",
        email: "test@test.com"
      }
    },
    {
      id: 2,
      content: "Comment 2",
      createdAt: new Date().toDateString(),
      user: {
        id: "test_user_id",
        avatar:
            "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
        username: "Test",
        email: "test@test.com"
      }
    },
    {
      id: 3,
      content: "Comment 1",
      createdAt: new Date().toDateString(),
      user: {
        id: "test_user_id",
        avatar:
            "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
        username: "Test",
        email: "test@test.com"
      }
    },
    {
      id: 4,
      content: "Comment 2",
      createdAt: new Date().toDateString(),
      user: {
        id: "test_user_id",
        avatar:
            "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
        username: "Test",
        email: "test@test.com"
      }
    }
  ]
}

export const LastCommentsFakeData: Response<Comment[]> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: [
    {
      id: 1,
      content: "Comment 1",
      createdAt: new Date().toDateString(),
      user: {
        id: "test_user_id",
        avatar:
            "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
        username: "Test",
        email: "test@test.com"
      }
    },
    {
      id: 2,
      content: "Comment 2",
      createdAt: new Date().toDateString(),
      user: {
        id: "test_user_id",
        avatar:
            "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
        username: "Test",
        email: "test@test.com"
      }
    }
  ]
}

export const CreateCommentFakeData: Response<Comment> = {
  status: 200,
  message: "Запрос выполнен",
  data: {
    id: 5,
    content: "new comment",
    createdAt: new Date().toDateString(),
    user: {
      id: "test_user_id",
      avatar:
          "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      username: "Test",
      email: "test@test.com"
    }
  }
}
