import { AxiosResponse } from "axios"

import { api } from "@core"

import { Settings, User, Delete } from "dto/types/User"
import { Community } from "dto/types/Communities"
import { Response } from "types/default"
import {AuthenticationResponse} from '../types/Authentication';

const _api = {
  getData: (): Promise<Response<User | null>> =>
    api
      .get("/user")
      .then((res: AxiosResponse<Response<User | null>>) => res.data),
  update: (data: Settings): Promise<Response<AuthenticationResponse>> =>
    api
      .put(`/user`, data)
      .then((res: AxiosResponse<Response<AuthenticationResponse>>) => res.data),
  delete: (): Promise<Response<Delete>> =>
    api
      .delete(`/user`)
      .then((res: AxiosResponse<Response<Delete>>) => res.data),
  getMyCommunities: (): Promise<Response<Community[]>> =>
    api
      .get("/user/my-communities")
      .then((res: AxiosResponse<Response<Community[]>>) => res.data),
  getFollowedCommunities: (): Promise<Response<Community[]>> =>
    api
      .get("/user/followed-communities")
      .then((res: AxiosResponse<Response<Community[]>>) => res.data)
}

export default _api
