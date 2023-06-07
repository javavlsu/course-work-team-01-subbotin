import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"

export interface FormFieldProps {
  name: string
  label?: string
  description?: ReactNode
  children: ReactNode
}

export interface FormProps {
  validationMode?: "onBlur" | "onChange" | "onSubmit" | "onTouched"
  shouldFocusError?: boolean
  onSubmit?: (data: any) => void
  defaultValues?: {
    [key: string]: any
  }
  className?: string
  name?: string
  yupSchema?: any
  children?: ReactNode
  onInit?: (methods: UseFormReturn) => void
}
