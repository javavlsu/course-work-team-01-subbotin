export interface Post {
  id: number
  title: string
  content: string
  likesCount: number
  commentsCount: number
  createdAt: string
  isMyLike?: boolean
  communityId: number
  attachments: string[]
  isCommunityOwner: boolean
}

export interface PostPost {
  id?: number
  title: string
  content: string
  files: string[]
}

export interface Like {
  isMyLike: boolean
  count: number
}

export type Delete = boolean
