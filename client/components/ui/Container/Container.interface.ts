import { MouseEventHandler, ReactNode } from "react"

export type ContainerType = "1" | "2" | "3" | "4"
export type ContainerStyleType = "light" | "dark" | "primary"

export interface ContainerProps {
  children: ReactNode
  type?: ContainerType
  styleType?: ContainerStyleType
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  ref?: any
}

export interface StylesBase {
  type?: ContainerType
  styleType?: ContainerStyleType
}
