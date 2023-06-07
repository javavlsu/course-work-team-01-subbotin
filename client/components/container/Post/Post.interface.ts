import { Post } from "dto/types/Posts"

export interface PostProps {
  post: Post
  styleType?: "light" | "dark"
  isOwner: boolean
  communityName: string
  ref?: any
}
