import { FC, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Hls from "hls.js"

import { streamSocket } from "@core"

import { useStream } from "dto/hooks/Stream"

import { VideoProps } from "./Video.interface"

import {
  Base,
  Description,
  Header,
  Stream,
  Tag,
  Text,
  Title
} from "./Video.styles"

const Video: FC<VideoProps> = ({ streamKey }) => {
  const { query } = useRouter()

  const { data } = useStream(Number(query.id) || 0)

  const [isLive, setIsLive] = useState<boolean>(false)

  const ref = useRef<HTMLVideoElement>(null)

  const handeBuildPlayer = () => {
    const video = ref?.current
    const src = `${process.env.NEXT_PUBLIC_STREAM_RTMP_URL}/live/${streamKey}/index.m3u8`

    if (!video) return

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src

      video.play().then(() => {
        setIsLive(true)
      })
    } else if (Hls.isSupported()) {
      const hls = new Hls()

      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src)

        video.play().then(() => {
          setIsLive(true)
        })
      })
    }
  }

  useEffect(() => {
    streamSocket.on("STREAM:RUN_VIDEO", (data: { stream: string }) => {
      setTimeout(() => {
        handeBuildPlayer()
      }, 10000)
    })

    handeBuildPlayer()
  }, [handeBuildPlayer])

  return (
    <Base>
      <Stream ref={ref} muted autoPlay></Stream>
      <Header>
        <Text>
          <Title>{data?.title}</Title>
          <Description>{data?.description}</Description>
        </Text>
        {isLive && <Tag>Live</Tag>}
      </Header>
    </Base>
  )
}

export default Video
