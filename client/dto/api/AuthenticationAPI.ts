import { AxiosResponse } from "axios"

import { api } from "@core"

import {
  AuthorizationData,
  RegistrationData,
  AuthenticationResponse
} from "dto/types/Authentication"
import { Response } from "types/default"

const _api = {
  login: (
    loginData: AuthorizationData
  ): Promise<Response<AuthenticationResponse>> =>
    api
      .post("/authentication/login", loginData)
      .then((res: AxiosResponse<Response<AuthenticationResponse>>) => res.data),
  registration: (
    registrationData: RegistrationData
  ): Promise<Response<AuthenticationResponse>> =>
    api
      .post("/authentication/registration", registrationData)
      .then((res: AxiosResponse<Response<AuthenticationResponse>>) => res.data)
}

export default _api
