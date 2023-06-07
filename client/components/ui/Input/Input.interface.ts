import { HTMLInputTypeAttribute, ReactNode } from "react"

export type InputStyleType = "light" | "dark"

export type InputValidationType = "error" | "success"

export type InputValidation = {
  type: InputValidationType
  message?: string
}

export interface InputProps {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  name?: string
  disable?: boolean
  type?: HTMLInputTypeAttribute
  prefix?: ReactNode
  className?: string
  styleType?: InputStyleType
  validation?: InputValidation
  autoComplete?: boolean
  readOnly?: boolean
}
