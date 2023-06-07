import { PostCommunity, Community } from "dto/types/Communities"

export interface CreateCommunityProps {
  open: boolean
  onClose: () => void

  communityId?: number
  onSuccess?: (community: Community) => void
  onDelete?: (id: number) => void
}

export type InitialValues = Omit<PostCommunity, "avatar" | "banner">
