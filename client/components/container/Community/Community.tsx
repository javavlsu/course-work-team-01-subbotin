import { FC, useEffect, useState } from "react"
import Link from "next/link"

import { streamSocket } from "@core"

import { useFollow } from "dto/hooks/Communities"

import { Avatar } from "@ui"
import { LikeButton } from "@container"

import { Community as CommunityProps } from "dto/types/Communities"

import {
  Base,
  Controls,
  Description,
  StreamButton,
  StreamStatus,
  Title
} from "./Community.styles"

const Community: FC<
  Omit<CommunityProps, "banner" | "keywords"> & {
    styleType?: "dark" | "light"
  }
> = ({
  id,
  avatar,
  name,
  followersCount,
  description,
  isMyFollow,
  isCommunityOwner,
  streamId,
  styleType = "light"
}) => {
  const { mutateAsync } = useFollow()

  const [stream, setStream] = useState<boolean>(!!streamId)
  const [isLike, setIsLike] = useState<boolean>(!!isMyFollow)
  const [likeCount, setLikeCount] = useState<number>(followersCount)

  const handleLike = () =>
    mutateAsync().then((result) => {
      setIsLike(result.isMyFollow)
      setLikeCount(result.count)
    })

  useEffect(() => {
    streamSocket.on(
      "COMMUNITY:STREAM_STATUS",
      (data: { communityId: number; isOnline: boolean }) =>
        data.communityId === id && setStream(data.isOnline)
    )
  }, [id])

  return (
    <Base styleType={styleType}>
      <Avatar img={avatar} alt={name} size="middle" styleType={styleType} />
      <Title
        href={{
          pathname: "/communities/[id]",
          query: { id: id }
        }}>
        {name}
      </Title>
      <Description>{description}</Description>
      <Controls>
        {!isCommunityOwner ? (
          <LikeButton
            count={likeCount}
            liked={isLike}
            onLike={handleLike}
            styleType={styleType}
          />
        ) : (
          `${likeCount} подписчиков`
        )}
        {stream && (
          <Link
            href={{
              pathname: "/communities/[id]/stream",
              query: { id: id }
            }}>
            <StreamButton styleType={styleType}>
              <StreamStatus />
              Стрим
            </StreamButton>
          </Link>
        )}
      </Controls>
    </Base>
  )
}

export default Community
