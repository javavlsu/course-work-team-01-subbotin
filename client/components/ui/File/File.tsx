import { FC } from "react"

import {
  MdImage,
  MdInsertDriveFile,
  MdAudiotrack,
  MdVideocam
} from "react-icons/md"

import { FileProps } from "./File.interface"

import { Base, Image, Overlay, Filename } from "./File.styles"

const File: FC<FileProps> = ({ type, url, name, styleType = "light" }) => {
  const renderData = () => {
    switch (type) {
      case "image":
        return (
          <>
            <Image src={url || ""} alt={name || ""} quality={20} />
            <Overlay>
              <MdImage />
            </Overlay>
          </>
        )
      case "video":
        return (
          <>
            <MdVideocam />
          </>
        )
      case "audio":
        return <MdAudiotrack />
      case "document":
        return <MdInsertDriveFile />
      default:
        return <></>
    }
  }

  return (
    <Base styleType={styleType}>
      {renderData()}
      {!!name && <Filename>{name}</Filename>}
    </Base>
  )
}

export default File
