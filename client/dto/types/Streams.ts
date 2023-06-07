export interface Stream {
  _id: string
  key: string
  title: string
  description: string
  communityId: number
}

export interface Message {
  _id: string
  text: string
  username: string
}

export interface CreateMessage {
  text: string
}

export interface PostMessage {
  streamId: string
  room: string
  username: string
  text: string
}

export interface PostStartStream {
  communityId: number
  key: string
  title: string
  description: string
}

export interface PostStopStream {
  communityId: number
  streamId: string
}