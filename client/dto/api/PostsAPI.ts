import { AxiosResponse } from "axios"

import { api } from "@core"

import { Post, Like, PostPost, Delete } from "dto/types/Posts"
import { User } from "dto/types/User"
import { Response, ResponsePagination } from "types/default"

const _api = {
  getAll: (
    communityId: number,
    page: number
  ): Promise<ResponsePagination<Post[]>> =>
    api
      .get(`/posts/community/${communityId}`, {
        params: {
          page: page
        }
      })
      .then((res: AxiosResponse<ResponsePagination<Post[]>>) => res.data),
  create: (data: PostPost, communityId: number): Promise<Response<Post>> =>
    api
      .post(`/posts`, { ...data, communityId })
      .then((res: AxiosResponse<Response<Post>>) => res.data),
  getById: (postId: number): Promise<Response<Post>> =>
    api
      .get(`/posts/${postId}`)
      .then((res: AxiosResponse<Response<Post>>) => res.data),
  update: (
    data: PostPost,
    communityId: number,
    postId: number
  ): Promise<Response<Post>> =>
    api
      .put(`/posts/${postId}`, { communityId: communityId, ...data })
      .then((res: AxiosResponse<Response<Post>>) => res.data),
  delete: (postId: number): Promise<Response<Delete>> =>
    api
      .delete(`/posts/${postId}`)
      .then((res: AxiosResponse<Response<Delete>>) => res.data),
  like: (postId: number): Promise<Response<Like>> =>
    api
      .post(`/posts/${postId}/like`)
      .then((res: AxiosResponse<Response<Like>>) => res.data),
  getLikes: (postId: number): Promise<Response<User[]>> =>
    api
      .get(`/posts/${postId}/likes`)
      .then((res: AxiosResponse<Response<User[]>>) => res.data)
}

export default _api
