export type FileType = "image" | "video" | "audio" | "document"

export type File = {
  id: number
  type: FileType
  url: string
  name: string
}

export interface PayloadFile {
  files: string[]
  tags: string[]
}

export interface PayloadPostFiles {
  postId: number
  folder: string
  files: PayloadFile[]
}
