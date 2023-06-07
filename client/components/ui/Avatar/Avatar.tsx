import { FC } from "react"

import { Loader } from "@ui"
import { MdPerson } from "react-icons/md"

import { AvatarProps } from "./Avatar.interface"

import { Base, Image, ImageContainer } from "./Avatar.styles"

const Avatar: FC<AvatarProps> = ({
  img,
  size = "middle",
  alt,
  overflowContent,
  noImageContent,
  styleType = "light",
  loading,
  onClick
}) => {
  return (
    <Base size={size} styleType={styleType} onClick={onClick}>
      {!!overflowContent && <span>{overflowContent}</span>}
      <ImageContainer size={size} styleType={styleType}>
        {loading && <Loader />}
        {!loading &&
          (img ? (
            <Image src={img} alt={alt} />
          ) : noImageContent ? (
            noImageContent
          ) : (
            <MdPerson fontSize={24} />
          ))}
      </ImageContainer>
    </Base>
  )
}

export default Avatar
