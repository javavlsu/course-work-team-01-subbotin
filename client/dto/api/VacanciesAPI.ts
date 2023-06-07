import { AxiosResponse } from "axios"

import { api } from "@core"

import { Vacancy, Respond, PostVacancy, Delete } from "dto/types/Vacancies"
import { Response, ResponsePagination } from "types/default"
import { User } from "@dto/types/User"

const _api = {
  getAll: (
    communityId: number,
    page: string
  ): Promise<ResponsePagination<Vacancy[]>> =>
    api
      .get(`/vacancies/community/${communityId}`, {
        params: {
          page: page
        }
      })
      .then((res: AxiosResponse<ResponsePagination<Vacancy[]>>) => res.data),
  getLast: (communityId: number): Promise<Response<Vacancy[]>> =>
    api
      .get(`/vacancies/community/${communityId}/last`)
      .then((res: AxiosResponse<Response<Vacancy[]>>) => res.data),
  create: (
    data: PostVacancy,
    communityId: number
  ): Promise<Response<Vacancy>> =>
    api
      .post(`/vacancies`, { ...data, communityId })
      .then((res: AxiosResponse<Response<Vacancy>>) => res.data),
  getById: (vacancyId: number): Promise<Response<Vacancy>> =>
    api
      .get(`/vacancies/${vacancyId}`)
      .then((res: AxiosResponse<Response<Vacancy>>) => res.data),
  update: (
    data: PostVacancy,
    communityId: number,
    vacancyId: number
  ): Promise<Response<Vacancy>> =>
    api
      .put(`/vacancies/${vacancyId}`, { communityId: communityId, ...data })
      .then((res: AxiosResponse<Response<Vacancy>>) => res.data),
  delete: (vacancyId: number): Promise<Response<Delete>> =>
    api
      .delete(`/vacancies/${vacancyId}`)
      .then((res: AxiosResponse<Response<Delete>>) => res.data),
  respond: (vacancyId: number): Promise<Response<Respond>> =>
    api
      .post(`/vacancies/${vacancyId}/respond`)
      .then((res: AxiosResponse<Response<Respond>>) => res.data),
  getResponses: (vacancyId: number): Promise<Response<User[]>> =>
    api
      .get(`/vacancies/${vacancyId}/responses`)
      .then((res: AxiosResponse<Response<User[]>>) => res.data)
}

export default _api
