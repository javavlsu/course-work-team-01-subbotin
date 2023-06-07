import { ReactNode } from "react"

export type TagStyleType = "light" | "dark"

export interface TagProps {
  children: ReactNode
  styleType?: TagStyleType
}
