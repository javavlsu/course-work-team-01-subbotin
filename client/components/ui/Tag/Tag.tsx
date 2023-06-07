import { FC } from "react"

import { TagProps } from "./Tag.interface"

import { Base } from "./Tag.styles"

const Tag: FC<TagProps> = ({ children, styleType = "light" }) => {
  return <Base styleType={styleType}>{children}</Base>
}

export default Tag
