import { AuthenticationResponse } from "dto/types/Authentication"
import { Response } from "types/default"

export const AuthenticationFakeData: Response<AuthenticationResponse> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: {
    token: "a-ut-adipisci",
    expiration: "2022-11-27T12:52:46.131Z"
  }
}
