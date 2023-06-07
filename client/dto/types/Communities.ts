import {User} from './User';

export type Community = {
  id: number
  avatar: string
  banner?: string
  name: string
  description: string
  followersCount: number
  keywords: string[]
  isStreamOnline?: boolean
  isMyFollow?: boolean
  isCommunityOwner?: boolean
  streamId: string
}

export interface PostCommunity {
  id?: number
  avatar: string
  banner?: string
  name: string
  description: string
  keywords: string[]
}

export type Follow = {
  isMyFollow: boolean
  count: number
}

export type Delete = boolean
