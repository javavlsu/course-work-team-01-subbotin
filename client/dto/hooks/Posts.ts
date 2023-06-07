import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient
} from "@tanstack/react-query"
import { useRouter } from "next/router"
import { AxiosError } from "axios"

import postsAPI from "dto/api/PostsAPI"

import { Post, Like, PostPost, Delete } from "dto/types/Posts"
import { Response, ResponsePagination } from "types/default"
import { User } from "@dto/types/User"

export const useAll = (): UseInfiniteQueryResult<
  ResponsePagination<Post[]>
> => {
  const router = useRouter()
  const { id: communityId } = router.query

  return useInfiniteQuery<
    ResponsePagination<Post[]>,
    Error,
    ResponsePagination<Post[]>
  >(
    [`community`, communityId, "posts"],
    ({ pageParam = 1 }) => postsAPI.getAll(Number(communityId), pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.data.items.length === 10 ? allPages.length + 1 : undefined
        return nextPage
      }
    }
  )
}

export const useCreate = (): UseMutationResult<
  Post,
  { [key: string]: string },
  PostPost
> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id: communityId } = router.query

  return useMutation<Post, { [key: string]: string }, PostPost>(
    ["post", "create"],
    (data) =>
      postsAPI
        .create(data, Number(communityId))
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        ),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([`community`, communityId, "posts"])
      }
    }
  )
}

export const useById = (): UseQueryResult<Post> => {
  const router = useRouter()
  const { post } = router.query

  return useQuery<Response<Post>, Error, Post>(
    [`post`, post],
    () => postsAPI.getById(Number(post)),
    {
      select: (response) => response.data,
      enabled: !!Number(post)
    }
  )
}

export const useUpdate = (): UseMutationResult<
  Post,
  { [key: string]: string },
  PostPost
> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { post, id: communityId } = router.query

  return useMutation<Post, { [key: string]: string }, PostPost>(
    [`post`, post, "update"],
    (data) =>
      postsAPI
        .update(data, Number(communityId), Number(post))
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        ),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([`post`, post])
        await queryClient.invalidateQueries([`community`, communityId, "posts"])
      }
    }
  )
}

export const useDelete = (): UseMutationResult<Delete, Error, void> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { post, id: communityId } = router.query

  return useMutation<Delete, Error, void>(
    [`post`, post, "delete"],
    () => postsAPI.delete(Number(post)).then((response) => response.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([`community`, communityId, "posts"])
      }
    }
  )
}

export const useLike = (
  postId?: number
): UseMutationResult<Like, Error, void> => {
  const router = useRouter()
  const { post } = router.query

  return useMutation<Like, Error, void>(
    [`post`, postId ? postId : post, "like"],
    () =>
      postsAPI
        .like(postId ? postId : Number(post))
        .then((response) => response.data)
  )
}

export const useLikes = (enabled: boolean): UseQueryResult<User[]> => {
  const router = useRouter()
  const { post } = router.query

  return useQuery<Response<User[]>, Error, User[]>(
    [`post`, post, "likes"],
    () => postsAPI.getLikes(Number(post)),
    {
      select: (response) => response.data,
      enabled: !!Number(post) && enabled
    }
  )
}
