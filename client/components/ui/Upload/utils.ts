import { extension } from "mime-types"

import { Filter } from "./Upload.interface"
import { FileType } from "dto/types/Files"

export const getFileType = (mimeType: string): FileType => {
  return mimeType.includes("image")
    ? "image"
    : mimeType.includes("audio")
    ? "audio"
    : mimeType.includes("video")
    ? "video"
    : "document"
}

export const getFileSize = (size: number): string => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"]

  let i = 0

  for (i; size > 1024; i++) {
    size /= 1024
  }

  return size.toFixed(1) + " " + units[i]
}

export const filterFile = ({
  file,
  filter,
  currentLength
}: {
  file: File
  filter?: Filter
  currentLength: number
}): File => {
  if (filter) {
    const _size = filter?.size?.split(" ")
    const _fileSize = getFileSize(file.size).split(" ")

    if (
      _size &&
      _fileSize &&
      parseFloat(_fileSize[0]) > parseFloat(_size[0]) &&
      _fileSize[1] === _size[1]
    )
      throw Error("limit_max_size")

    if (filter?.type && filter?.type?.includes(extension(file.type).toString()))
      throw Error("wrong_extension")

    if (filter?.count && currentLength >= (filter?.count as number))
      throw Error("limit_file_count")
  }

  return file
}

export const url2file = async (url: string, name: string): Promise<File> => {
  return await fetch(url)
    .then((r) => r.blob())
    .then((blob) => new File([blob], name, { type: blob.type }))
}
