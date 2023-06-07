import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query"
import { useRouter } from "next/router"
import { AxiosError } from "axios"

import communitiesAPI from "dto/api/CommunitiesAPI"

import { Response, ResponsePagination, PaginationData } from "types/default"
import { Community, Follow, PostCommunity, Delete } from "dto/types/Communities"
import { User } from "@dto/types/User"
import vacanciesAPI from "@dto/api/VacanciesAPI"

export const useCommunity = (): UseQueryResult<PaginationData<Community[]>> => {
  const router = useRouter()
  const { page } = router.query

  return useQuery<
    ResponsePagination<Community[]>,
    Error,
    PaginationData<Community[]>
  >(["communities", page], () => communitiesAPI.getAll(page as string), {
    select: (response) => response.data
  })
}

export const useCreate = (): UseMutationResult<
  Community,
  { [key: string]: string },
  PostCommunity
> =>
  useMutation<Community, { [key: string]: string }, PostCommunity>(
    [`communities`, "create"],
    (data) =>
      communitiesAPI
        .create(data)
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        )
  )

export const useById = (): UseQueryResult<Community> => {
  const router = useRouter()
  const { id: communityId } = router.query

  return useQuery<Response<Community>, Error, Community>(
    ["communities", communityId],
    () => communitiesAPI.getById(Number(communityId)),
    {
      select: (response) => response.data,
      enabled: !!communityId
    }
  )
}

export const useUpdate = (): UseMutationResult<
  Community,
  { [key: string]: string },
  PostCommunity
> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id: communityId } = router.query

  return useMutation<Community, { [key: string]: string }, PostCommunity>(
    ["communities", communityId, "update"],
    (data) =>
      communitiesAPI
        .update(data, Number(communityId))
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        ),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["communities", communityId])
      }
    }
  )
}

export const useDelete = (): UseMutationResult<Delete, Error, void> => {
  const router = useRouter()
  const { id: communityId } = router.query

  return useMutation<Delete, Error, void>(
    ["communities", communityId, "delete"],
    () =>
      communitiesAPI
        .delete(Number(communityId))
        .then((response) => response.data)
  )
}

export const useFollow = (): UseMutationResult<Follow, Error, void> => {
  const router = useRouter()
  const { id: communityId } = router.query

  return useMutation<Follow, Error, void>(
    ["communities", communityId, "follow"],
    () =>
      communitiesAPI
        .follow(Number(communityId))
        .then((response) => response.data)
  )
}

export const useFollowers = (enabled: boolean): UseQueryResult<User[]> => {
  const router = useRouter()
  const { id: communityId } = router.query

  return useQuery<Response<User[]>, Error, User[]>(
    ["communities", communityId, "followers"],
    () => communitiesAPI.getFollowers(Number(communityId)),
    {
      select: (response) => response.data,
      enabled: !!Number(communityId) && enabled
    }
  )
}
