import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult
} from "@tanstack/react-query"
import { useRouter } from "next/router"
import { AxiosError } from "axios"

import userAPI from "dto/api/UserAPI"

import { User, Settings, Delete } from "dto/types/User"
import { Response } from "types/default"
import { Community } from "dto/types/Communities"
import { AuthenticationResponse } from "../types/Authentication"

export const useUser = (): UseQueryResult<User | null> =>
  useQuery<Response<User | null>, Error, User | null>(
    ["user"],
    () => userAPI.getData(),
    {
      select: (response) => response.data
    }
  )

export const useUpdate = (): UseMutationResult<
  AuthenticationResponse,
  {
    [key: string]: string
  },
  Settings
> => {
  const router = useRouter()

  return useMutation<
    AuthenticationResponse,
    {
      [key: string]: string
    },
    Settings
  >(
    [`user`, "update"],
    (data) =>
      userAPI
        .update(data)
        .then((response) => response.data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        ),
    {
      onSuccess: (response) => {
        localStorage.setItem("token", response.token)
        router.reload()
      }
    }
  )
}

export const useDelete = (): UseMutationResult<Delete, Error, void> => {
  const router = useRouter()

  return useMutation<Delete, Error, void>(
    [`user`, "delete"],
    () => userAPI.delete().then((response) => response.data),
    {
      onSuccess: () => {
        localStorage.removeItem("token")
        router.reload()
      }
    }
  )
}

export const useMyCommunities = (): UseQueryResult<Community[]> =>
  useQuery<Response<Community[]>, Error, Community[]>(
    ["user", "my_communities"],
    () => userAPI.getMyCommunities(),
    {
      select: (response) => response.data
    }
  )
export const useFollowedCommunities = (
  isUser: boolean
): UseQueryResult<Community[]> =>
  useQuery<Response<Community[]>, Error, Community[]>(
    ["user", "followed_communities"],
    () => userAPI.getFollowedCommunities(),
    {
      select: (response) => response.data,
      enabled: isUser
    }
  )
