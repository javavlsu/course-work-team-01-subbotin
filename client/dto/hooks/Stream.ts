import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult
} from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/router"

import streamAPI from "dto/api/StreamsAPI"

import { useById } from "dto/hooks/Communities"
import { useUser } from "dto/hooks/User"

import { Response } from "types/default"
import {
  CreateMessage,
  Message,
  PostStartStream,
  Stream
} from "dto/types/Streams"

export const useStream = (): UseQueryResult<Stream> => {
  const router = useRouter()
  const { id: communityId } = router.query

  const { data, status } = useById()

  return useQuery<Response<Stream>, Error, Stream>(
    ["communities", communityId, "stream"],
    () => streamAPI.getData(data?.streamId || ""),
    {
      select: (response) => response.data,
      enabled: status === "success" && !!data?.streamId
    }
  )
}

export const useStart = (): UseMutationResult<
  Stream,
  { [key: string]: string },
  Omit<PostStartStream, "communityId">
> => {
  const router = useRouter()
  const { id: communityId } = router.query

  const { data: community } = useById()

  return useMutation<
    Stream,
    { [key: string]: string },
    Omit<PostStartStream, "communityId">
  >(["communities", communityId, "stream", "start"], (data) =>
    streamAPI
      .start({ communityId: community?.id || 0, ...data })
      .then((response) => response.data)
      .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
        Promise.reject(error?.response?.data.data)
      )
  )
}

export const useStop = (): UseMutationResult<
  boolean,
  { [key: string]: string },
  null
> => {
  const router = useRouter()
  const { id: communityId } = router.query

  const { data: stream } = useStream()

  return useMutation<boolean, { [key: string]: string }, null>(
    ["communities", communityId, "stream", "stop"],
    () =>
      streamAPI
        .stop({ communityId: Number(communityId), streamId: stream?._id || "" })
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        )
  )
}

export const useMessages = (): UseQueryResult<Message[]> => {
  const router = useRouter()
  const { id: communityId } = router.query

  const { data, status } = useStream()

  return useQuery<Response<Message[]>, Error, Message[]>(
    ["communities", communityId, "stream", "messages"],
    () => streamAPI.getAllMessages(data?._id || ""),
    {
      select: (response) => response.data,
      enabled: status === "success" && !!data?._id
    }
  )
}

export const useCreateMessage = (): UseMutationResult<
  Message,
  { [key: string]: string },
  CreateMessage
> => {
  const router = useRouter()
  const { id: communityId } = router.query

  const { data: streamData } = useStream()
  const { data: userData } = useUser()

  return useMutation<Message, { [key: string]: string }, CreateMessage>(
    ["communities", communityId, "stream", "message", "create"],
    (data) =>
      streamAPI
        .sendMessage({
          room: streamData?.key || "",
          streamId: streamData?._id || "",
          username: userData?.username || "",
          text: data.text
        })
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        )
  )
}
