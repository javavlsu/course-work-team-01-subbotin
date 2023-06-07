import { AxiosResponse } from "axios"

import { api } from "@core"

import { Comment, PostComment } from "dto/types/Comments"
import { Response } from "types/default"

const _api = {
  getAll: (postId: number): Promise<Response<Comment[]>> =>
    api
      .get(`/comments/post/${postId}`)
      .then((res: AxiosResponse<Response<Comment[]>>) => res.data),
  getLast: (
    communityId: number,
    postId: number
  ): Promise<Response<Comment[]>> =>
    api
      .get(`/communities/${communityId}/posts/${postId}/comments/last`)
      .then((res: AxiosResponse<Response<Comment[]>>) => res.data),
  create: (
    postId: number,
    data: PostComment
  ): Promise<Response<Comment>> =>
    api
      .post(`/comments`, { ...data, postId })
      .then((res: AxiosResponse<Response<Comment>>) => res.data)
}

export default _api
