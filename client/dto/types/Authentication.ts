export interface AuthorizationData {
  username: string
  password: string
}

export interface AuthenticationResponse {
  token: string
  expiration: string
}

export interface RegistrationData extends AuthorizationData {
  avatar: string
  email: string
}
