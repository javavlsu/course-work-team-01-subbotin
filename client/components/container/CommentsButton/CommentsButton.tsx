import { FC } from "react"

import { MdChatBubbleOutline, MdChatBubble } from "react-icons/md"
import { CommentsButtonProps } from "./CommentsButton.interface"

import { Base, Button, Count } from "./CommentsButton.styles"

const CommentsButton: FC<CommentsButtonProps> = ({
  count,
  styleType,
  onClick
}) => {
  return (
    <Base>
      <Button onClick={() => onClick && onClick()} styleType={styleType}>
        {!count ? <MdChatBubbleOutline /> : <MdChatBubble />}
      </Button>
      {!!count && <Count>{count}</Count>}
    </Base>
  )
}

export default CommentsButton
