import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { v4 as uuid } from "uuid"
import Link from "next/link"
import { useMediaQuery } from "usehooks-ts"

import { streamSocket } from "@core"

import { useById, useFollow, useFollowers } from "dto/hooks/Communities"
import { useStop } from "dto/hooks/Stream"

import { Avatar, Button, Modal, Tag } from "@ui"
import { LikeButton, QueryWrapper, Users } from "@container"
import CommunitySettings from "components/modules/CommunitySettings"
import StreamSettings from "components/modules/StreamSettings"
import { MdPlayArrow } from "react-icons/md"

import {
  Card,
  CardContent,
  CardSettings,
  Container,
  Description,
  ShowAllButton,
  StreamButton,
  StreamStatus,
  Tags,
  UsersBase
} from "./Info.styles"

const Info: FC<{ communityId: number }> = ({ communityId }) => {
  const router = useRouter()
  const isAdaptive = useMediaQuery("(max-width: 1300px)")

  const [stream, setStream] = useState<boolean>()
  const [isShowAll, setIsShowAll] = useState<boolean>(!isAdaptive)
  const [isLike, setIsLike] = useState<boolean>()
  const [likeCount, setLikeCount] = useState<number>()
  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)
  const [isOpenFollowers, setIsOpenFollowers] = useState<boolean>(false)
  const [isOpenStreamSettings, setIsOpenStreamSettings] =
    useState<boolean>(false)

  const { data: communityData } = useById()
  const { data: followers, status: followersStatus } =
    useFollowers(isOpenFollowers)
  const { mutateAsync: follow } = useFollow()
  const { mutate: stopStream } = useStop()

  const settingsReducer = {
    open: () => setIsOpenSettings(true),
    close: () => setIsOpenSettings(false)
  }

  const streamSettingsReducer = {
    open: () => setIsOpenStreamSettings(true),
    close: () => setIsOpenStreamSettings(false)
  }

  const followersReducer = {
    open: () => setIsOpenFollowers(true),
    close: () => setIsOpenFollowers(false)
  }

  const handleToggleShowAll = () => setIsShowAll(!isShowAll)

  const handleLike = () =>
    follow().then((result) => {
      setIsLike(result.isMyFollow)
      setLikeCount(result.count)
    })

  const handleUpdateCommunity = () => {
    streamSettingsReducer.close()
  }

  const handleDeleteCommunity = () => {
    settingsReducer.close()
    router.push("/")
  }

  useEffect(() => {
    setIsShowAll(!isAdaptive)
  }, [isAdaptive])

  useEffect(() => {
    setIsLike(!!communityData?.isMyFollow)
    setLikeCount(communityData?.followersCount || 0)
    setStream(!!communityData?.streamId)
  }, [communityData])

  useEffect(() => {
    streamSocket.on(
      "COMMUNITY:STREAM_STATUS",
      (data: { communityId: number; isOnline: boolean }) =>
        data.communityId === communityId && setStream(data.isOnline)
    )
  }, [communityId])

  return (
    <>
      <Container>
        <Card>
          <h1>{communityData?.name}</h1>
          <CardContent>
            <Avatar
              img={communityData?.avatar || ""}
              alt={communityData?.name || ""}
              styleType="dark"
              size="middle"
            />
            <div>
              <p>
                <span>{likeCount}</span>
                <br />
                подписчиков
              </p>
              {!communityData?.isCommunityOwner && (
                <LikeButton
                  onLike={handleLike}
                  liked={isLike}
                  styleType="dark"
                />
              )}
              {communityData?.isCommunityOwner && (
                <CardSettings onClick={settingsReducer.open} />
              )}
            </div>
          </CardContent>
        </Card>
        {communityData?.isCommunityOwner && (
          <Button styleType="dark" onClick={followersReducer.open}>
            Подписчики
          </Button>
        )}
        <Link
          href={{
            pathname: "/communities/[id]/stream",
            query: { id: communityId }
          }}>
          <StreamButton>
            <StreamStatus isOnline={!!stream}>
              <span></span>
              Стрим {stream ? "онлайн" : "оффлайн"}
            </StreamStatus>
            <MdPlayArrow />
          </StreamButton>
        </Link>
        {communityData?.isCommunityOwner && (
          <Button
            styleType="dark"
            onClick={() =>
              stream ? stopStream(null) : streamSettingsReducer.open()
            }>
            {!stream ? "Запустить трансляцию" : "Остановить трансляцию"}
          </Button>
        )}
        {isShowAll && (
          <>
            <Description>
              <h3>Об авторе</h3>
              <span />
              <p>{communityData?.description}</p>
            </Description>
            <Tags>
              {communityData?.keywords.map((item) => (
                <Tag key={uuid()} styleType="dark">
                  {item}
                </Tag>
              ))}
            </Tags>
          </>
        )}
        {isAdaptive && (
          <ShowAllButton onClick={handleToggleShowAll} styleType="dark">
            {!isShowAll ? "Показать всё" : "Скрыть"}
          </ShowAllButton>
        )}
      </Container>
      {communityData?.isCommunityOwner && (
        <>
          <CommunitySettings
            open={isOpenSettings}
            onClose={settingsReducer.close}
            communityId={communityId}
            onSuccess={handleUpdateCommunity}
            onDelete={handleDeleteCommunity}
          />
          <StreamSettings
            communityId={communityId}
            open={isOpenStreamSettings}
            onClose={streamSettingsReducer.close}
            onSuccess={handleUpdateCommunity}
          />
          <Modal open={isOpenFollowers} onClose={followersReducer.close}>
            <UsersBase styleType="dark">
              <QueryWrapper status={followersStatus}>
                <Users users={followers} notFoundText="Нет подписчиков" />
              </QueryWrapper>
            </UsersBase>
          </Modal>
        </>
      )}
    </>
  )
}

export default Info
