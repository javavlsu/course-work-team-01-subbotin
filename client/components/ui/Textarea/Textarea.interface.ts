export type TextareaStyleType = "light" | "dark"

export type TextareaValidationType = "error" | "success"

export type TextareaValidation = {
  type: TextareaValidationType
  message?: string
}

export interface TextareaProps {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  name?: string
  disable?: boolean
  className?: string
  styleType?: TextareaStyleType
  validation?: TextareaValidation
}
