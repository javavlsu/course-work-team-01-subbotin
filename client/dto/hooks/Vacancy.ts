import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient
} from "@tanstack/react-query"
import { useRouter } from "next/router"
import { AxiosError } from "axios"

import vacanciesAPI from "@dto/api/VacanciesAPI"

import { Vacancy, Delete, PostVacancy, Respond } from "dto/types/Vacancies"
import { PaginationData, Response, ResponsePagination } from "types/default"
import { User } from "@dto/types/User"

export const useVacancies = (): UseQueryResult<PaginationData<Vacancy[]>> => {
  const router = useRouter()
  const { page = "1", id: communityId } = router.query

  return useQuery<
    ResponsePagination<Vacancy[]>,
    Error,
    PaginationData<Vacancy[]>
  >(
    ["community", communityId, "vacancies", page],
    () => vacanciesAPI.getAll(Number(communityId), page as string),
    {
      select: (response) => response.data
    }
  )
}

export const useLastVacancies = (): UseQueryResult<Vacancy[]> => {
  const router = useRouter()
  const { id: communityId } = router.query

  return useQuery<Response<Vacancy[]>, Error, Vacancy[]>(
    ["community", communityId, "vacancies", "last"],
    () => vacanciesAPI.getLast(Number(communityId)),
    {
      select: (response) => response.data
    }
  )
}

export const useCreateVacancy = (): UseMutationResult<
  Vacancy,
  { [key: string]: string },
  PostVacancy
> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { page = "1", id: communityId } = router.query

  return useMutation<Vacancy, { [key: string]: string }, PostVacancy>(
    ["vacancy", "create"],
    (data) =>
      vacanciesAPI
        .create(data, Number(communityId))
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        ),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "community",
          communityId,
          "vacancies",
          page
        ])
      }
    }
  )
}

export const useGetVacancyById = (): UseQueryResult<Vacancy> => {
  const router = useRouter()
  const { vacancy } = router.query

  return useQuery<Response<Vacancy>, Error, Vacancy>(
    [`vacancy`, vacancy],
    () => vacanciesAPI.getById(Number(vacancy)),
    {
      select: (response) => response.data,
      enabled: !!Number(vacancy)
    }
  )
}

export const useUpdateVacancy = (): UseMutationResult<
  Vacancy,
  { [key: string]: string },
  PostVacancy
> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { vacancy, id: communityId } = router.query

  return useMutation<Vacancy, { [key: string]: string }, PostVacancy>(
    [`vacancy`, vacancy, "update"],
    (data) =>
      vacanciesAPI
        .update(data, Number(communityId), Number(vacancy))
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        ),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([`vacancy`, vacancy])
      }
    }
  )
}

export const useDeleteVacancy = (): UseMutationResult<Delete, Error, void> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { vacancy, id: communityId } = router.query

  return useMutation<Delete, Error, void>(
    [`vacancy`, vacancy, "delete"],
    () =>
      vacanciesAPI.delete(Number(vacancy)).then((response) => response.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          `community`,
          communityId,
          "vacancies"
        ])
      }
    }
  )
}

export const useRespondVacancy = (): UseMutationResult<
  Respond,
  Error,
  void
> => {
  const router = useRouter()
  const { vacancy } = router.query

  return useMutation<Respond, Error, void>([`vacancy`, vacancy, "like"], () =>
    vacanciesAPI.respond(Number(vacancy)).then((response) => response.data)
  )
}

export const useVacancyResponses = (
  enabled: boolean
): UseQueryResult<User[]> => {
  const router = useRouter()
  const { vacancy } = router.query

  return useQuery<Response<User[]>, Error, User[]>(
    [`vacancy`, vacancy, "responses"],
    () => vacanciesAPI.getResponses(Number(vacancy)),
    {
      select: (response) => response.data,
      enabled: !!Number(vacancy) && enabled
    }
  )
}
