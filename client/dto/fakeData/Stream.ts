import { Response } from "types/default"
import { Stream, Message } from "dto/types/Streams"

export const StreamFakeData: Response<Stream> = {
  status: 200,
  message: "Запрос успешно выпонен",
  data: {
    _id: "teststream123",
    key: "test_stream",
    title: "New Stream Title",
    description: "New Stream Description",
    communityId: 1
  }
}

export const MessagesFakeData: Response<Message[]> = {
    status: 200,
    message: "Запрос успешно выпонен",
    data: [
        {
            _id: "1",
            text: "asdasdasdasd",
            username: "Username"
        },
        {
            _id: "2",
            text: "asdasdasdasd",
            username: "Username"
        },
        {
            _id: "3",
            text: "asdasdasdasd",
            username: "Username"
        },
        {
            _id: "4",
            text: "asdasdasdasd",
            username: "Username"
        },
        {
            _id: "5",
            text: "asdasdasdasd",
            username: "Username"
        }
    ]
}
