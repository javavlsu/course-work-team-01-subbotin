import { AxiosResponse } from "axios"

import { streamApi } from "@core"

import { Stream, Message, PostMessage, PostStartStream, PostStopStream } from "dto/types/Streams"
import { Response } from "types/default"

const _api = {
  getData: (id: string): Promise<Response<Stream>> =>
    streamApi
      .get(`/stream?stream=${id}`)
      .then((res: AxiosResponse<Response<Stream>>) => res.data),
  start: (data: PostStartStream): Promise<Response<Stream>> =>
    streamApi
      .post(`/stream/start`, data)
      .then((res: AxiosResponse<Response<Stream>>) => res.data),
  stop: (data: PostStopStream): Promise<Response<boolean>> =>
    streamApi
      .post(`/stream/stop`, data)
      .then((res: AxiosResponse<Response<boolean>>) => res.data),
  getAllMessages: (id: string): Promise<Response<Message[]>> =>
    streamApi
      .get(`/stream/messages?stream=${id}`)
      .then((res: AxiosResponse<Response<Message[]>>) => res.data),
  sendMessage: (data: PostMessage): Promise<Response<Message>> =>
    streamApi
      .post(`/stream/messages`, data)
      .then((res: AxiosResponse<Response<Message>>) => res.data)
}

export default _api
