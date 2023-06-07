import { AxiosResponse } from "axios"

import { api } from "@core"

import { Community, Delete, Follow, PostCommunity } from "dto/types/Communities"
import { Response, ResponsePagination } from "types/default"
import { User } from "@dto/types/User"

const _api = {
  getAll: (page = "1"): Promise<ResponsePagination<Community[]>> =>
    api
      .get("/communities", {
        params: {
          page: page
        }
      })
      .then((res: AxiosResponse<ResponsePagination<Community[]>>) => res.data),
  create: (data: PostCommunity): Promise<Response<Community>> =>
    api
      .post(`/communities`, data)
      .then((res: AxiosResponse<Response<Community>>) => res.data),
  getById: (communityId: number): Promise<Response<Community>> =>
    api
      .get(`/communities/${communityId}`)
      .then((res: AxiosResponse<Response<Community>>) => res.data),
  update: (
    data: PostCommunity,
    communityId: number
  ): Promise<Response<Community>> =>
    api
      .put(`/communities/${communityId}`, data)
      .then((res: AxiosResponse<Response<Community>>) => res.data),
  delete: (communityId: number): Promise<Response<Delete>> =>
    api
      .delete(`/communities/${communityId}`)
      .then((res: AxiosResponse<Response<Delete>>) => res.data),
  follow: (communityId: number): Promise<Response<Follow>> =>
    api
      .post(`/communities/${communityId}/follow`)
      .then((res: AxiosResponse<Response<Follow>>) => res.data),
  getFollowers: (communityId: number): Promise<Response<User[]>> =>
    api
      .get(`/communities/${communityId}/followers`)
      .then((res: AxiosResponse<Response<User[]>>) => res.data)
}

export default _api
