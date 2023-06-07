export interface User {
  id: string
  avatar?: string
  username: string
  email: string
}

export interface Settings extends User {
  password: string
}

export type Delete = boolean
