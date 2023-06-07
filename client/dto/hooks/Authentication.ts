import { useRouter } from "next/router"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { AxiosError } from "axios"

import authenticationAPI from "dto/api/AuthenticationAPI"

import {
  AuthorizationData,
  RegistrationData,
  AuthenticationResponse
} from "dto/types/Authentication"
import { Response } from "types/default"

export const useLogin = (): UseMutationResult<
  Response<AuthenticationResponse>,
  { [key: string]: string },
  AuthorizationData
> => {
  const router = useRouter()

  return useMutation<
    Response<AuthenticationResponse>,
    { [key: string]: string },
    AuthorizationData
  >(
    ["login"],
    (data) =>
      authenticationAPI
        .login(data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        ),
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token)
          router.reload()
        }
      }
    }
  )
}

export const useRegistration = (): UseMutationResult<
  Response<AuthenticationResponse>,
  { [key: string]: string },
  RegistrationData
> => {
  const router = useRouter()

  return useMutation<
    Response<AuthenticationResponse>,
    { [key: string]: string },
    RegistrationData
  >(
    ["registration"],
    (data) =>
      authenticationAPI
        .registration(data)
        .catch((error: AxiosError<Response<{ [key: string]: string }>>) =>
          Promise.reject(error?.response?.data.data)
        ),
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token)
          router.reload()
        }
      }
    }
  )
}
