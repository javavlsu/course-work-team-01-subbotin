import { ReactNode } from "react"

export type AvatarSizes = "small" | "middle" | "large"
export type AvatarStyleType = "light" | "dark"

export interface AvatarProps {
  img: string
  alt: string
  size?: AvatarSizes
  styleType?: AvatarStyleType
  overflowContent?: ReactNode
  noImageContent?: ReactNode
  loading?: boolean
  onClick?: () => void
}

export interface StylesBase {
  size: AvatarSizes
  styleType: AvatarStyleType
}
