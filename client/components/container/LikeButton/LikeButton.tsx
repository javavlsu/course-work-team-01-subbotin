import { FC } from "react"

import { QueryWrapper } from "@container"

import { LikeButtonProps } from "./LikeButton.interface"

import { Base, Button, Icon, IconLiked, Count } from "./LikeButton.styles"

const LikeButton: FC<LikeButtonProps> = ({
  count,
  liked,
  onLike,
  styleType,
  loading
}) => {
  return (
    <Base>
      <Button onClick={() => onLike && onLike()} styleType={styleType}>
        <QueryWrapper status={loading ? "loading" : "success"} loaderSize="1em">
          {!liked ? <Icon /> : <IconLiked />}
        </QueryWrapper>
      </Button>
      {!!count && <Count>{count}</Count>}
    </Base>
  )
}

export default LikeButton
