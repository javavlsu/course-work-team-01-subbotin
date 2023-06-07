import axios from "axios"
import MockAdapter from "axios-mock-adapter"

import { AuthenticationFakeData } from "dto/fakeData/Authentication"
import {
  UserDeleteFakeData,
  UserFakeData,
  UserFollowedCommunitiesFakeData,
  UserMyCommunitiesFakeData
} from "dto/fakeData/User"
import {
  PostDeleteFakeData,
  PostFakeData,
  PostLikeFakeData,
  PostsFakeData
} from "dto/fakeData/Posts"
import {
  CommunitiesFakeData,
  CommunityDeleteFakeData,
  CommunityFakeData,
  CommunityFollowFakeData
} from "dto/fakeData/Communities"
import {
  CommentsFakeData,
  CreateCommentFakeData,
  LastCommentsFakeData
} from "dto/fakeData/Comments"

const axiosConfig = axios.create({
  baseURL: `http://localhost:5000/api`,
  headers: {
    "Access-Control-Allow-Origin": `*`,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
    Authorization:
      process.browser &&
      localStorage.getItem("token") &&
      `Bearer ${localStorage.getItem("token")}`
  }
})

const fakeApi = new MockAdapter(axiosConfig, { delayResponse: 1000 })

// Fake API для аутентификации
fakeApi.onPost("/authentication/login").reply(200, AuthenticationFakeData)
fakeApi
  .onPost("/authentication/registration")
  .reply(200, AuthenticationFakeData)

// Fake API для данных пользователя
fakeApi.onGet("/user").reply(200, UserFakeData)
fakeApi.onPut("/user").reply(200, UserFakeData)
fakeApi.onDelete("/user").reply(200, UserDeleteFakeData)
fakeApi.onGet("/user").reply(200, UserFakeData)
fakeApi.onGet("/user/my-communities").reply(200, UserMyCommunitiesFakeData)
fakeApi
  .onGet("/user/followed-communities")
  .reply(200, UserFollowedCommunitiesFakeData)

// Fake API для сообществ
fakeApi.onGet("/communities").reply(200, CommunitiesFakeData) // Получение список всех сообществ
fakeApi.onPost("/communities").reply(200, CommunityFakeData) // Создание сообщество
fakeApi.onGet("/communities/1").reply(200, CommunityFakeData) // Получение сообщеста по ID
fakeApi.onPut("/communities/1").reply(200, CommunityFakeData) // Обновление сообщества
fakeApi.onDelete("/communities/1").reply(200, CommunityDeleteFakeData) // Удаление сообщества
fakeApi.onPost("/communities/1/follow").reply(200, CommunityFollowFakeData) // Подписка / отписка от сообщества
fakeApi.onGet("/communities/popular").reply(200, CommunitiesFakeData) // Получение списка популярных сообществ

// Fake API для постов
fakeApi.onGet("/posts/community/1").reply(200, PostsFakeData)
fakeApi.onGet("/posts/1").reply(200, PostFakeData)
fakeApi.onPost("/posts/1/like").reply(200, PostLikeFakeData)
fakeApi.onDelete("/posts/1").reply(200, PostDeleteFakeData) // Удаление сообщества

// Fake API для комментариев
fakeApi.onGet("/comments/post/1").reply(200, CommentsFakeData)
fakeApi
  .onGet("/comments/post/1/last")
  .reply(200, LastCommentsFakeData)
fakeApi
  .onPost("/comments")
  .reply(204, CreateCommentFakeData)

fakeApi.restore()

if (process.env.NODE_ENV === "production") {
  fakeApi.restore()
}

export default axiosConfig
