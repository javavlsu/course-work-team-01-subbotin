import { ReactNode } from "react"
import { File as IFile, FileType } from "dto/types/Files"

export type UploadValidationType = "error" | "success"

export type UploadStyleType = "light" | "dark"

export type UploadValidation = {
  type: UploadValidationType
  message?: string
}

export type Filter = {
  count?: number
  size?: string
  type?: string[]
}

export interface UploadFileProps {
  id: string
  thumbUrl: string
  name: string
  type: FileType
  mimeType: string
  extension: string
  size: string
  originalFile: File
}

export interface UploadProps {
  disabled?: boolean
  onChange?: (file: UploadFileProps[]) => void
  accept?: string
  filter?: Filter
  multiple?: boolean
  value?: IFile[]
  className?: string
  name?: string
  validation?: UploadValidation
  styleType?: UploadStyleType
  button?: ReactNode
  withPreviews?: boolean
}
