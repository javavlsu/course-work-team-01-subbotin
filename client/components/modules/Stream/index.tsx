import { FC, useEffect } from "react"

import { streamSocket } from "@core"

import { useStream } from "dto/hooks/Stream"
import { useUser } from "dto/hooks/User"

import { QueryWrapper } from "@container"
import Video from "./Video"
import Chat from "./Chat"

import { Content } from "./Stream.styles"

const Stream: FC = () => {
  const { data: userData } = useUser()
  const { data: streamData, status: streamStatus } = useStream()

  useEffect(() => {
    streamSocket.emit("STREAM:JOIN", {
      username: userData?.username,
      room: streamData?.key || ""
    })
  }, [streamData?.key, userData?.username])

  return (
    <QueryWrapper status={streamStatus}>
      <Content>
        <Video streamKey={streamData?.key || ""} />
        <Chat />
      </Content>
    </QueryWrapper>
  )
}

export default Stream
