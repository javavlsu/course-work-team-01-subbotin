import {User} from './User';

export type Comment = {
  id: number
  content: string
  createdAt: string
  user: User
}

export interface PostComment {
  content: string
}
