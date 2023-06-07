import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient
} from "@tanstack/react-query"
import { useRouter } from "next/router"

import commentsAPI from "dto/api/CommentsAPI"
import { Response } from "types/default"

import { Comment, PostComment } from "dto/types/Comments"

export const useAll = (): UseQueryResult<Comment[]> => {
  const router = useRouter()
  const { post } = router.query

  return useQuery<Response<Comment[]>, Error, Comment[]>(
    [`post`, post, "comments"],
    () => commentsAPI.getAll(Number(post)),
    {
      select: (response) => response.data,
      enabled: !!post
    }
  )
}

export const useCreate = (): UseMutationResult<Comment, Error, PostComment> => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { post } = router.query

  return useMutation<Comment, Error, PostComment>(
    [`post`, post, "comments", "create"],
    (data) =>
      commentsAPI.create(Number(post), data).then((response) => response.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([`post`, post, "comments"])
      }
    }
  )
}
