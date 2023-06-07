import { FC, useState, useEffect } from "react"

import { streamSocket } from "@core"

import { useMessages, useCreateMessage } from "dto/hooks/Stream"

import { QueryWrapper } from "@container"
import { MdSend } from "react-icons/md"

import { Message as IMessage } from "dto/types/Streams"

import {
  Container,
  Messages,
  Message,
  SendMessageContainer,
  SendMessageInput,
  SendMessageButton
} from "./Chat.styles"

const Chat: FC = () => {
  const { data, status } = useMessages()
  const { mutateAsync: createMessage } = useCreateMessage()

  const [messages, setMessages] = useState<IMessage[]>(data || [])
  const [inputValue, setInputValue] = useState<string>("")

  const handleChangeInput = (value: string) => setInputValue(value)

  const handleSendMessage = () => {
    createMessage({ text: inputValue }).then(() => setInputValue(""))
  }

  useEffect(() => {
    setMessages(data || [])
  }, [data])

  useEffect(() => {
    streamSocket.on("STREAM:NEW_MESSAGE", (data: { message: IMessage }) =>
      setMessages([...messages, data.message])
    )
  }, [messages])

  return (
    <Container>
      <QueryWrapper status={status}>
        <Messages>
          {messages?.map((message) => (
            <Message key={message._id} username={message.username}>
              <span>{message.username} </span>
              {message.text}
            </Message>
          ))}
        </Messages>
        <SendMessageContainer>
          <div>
            <SendMessageInput
              value={inputValue}
              onChange={handleChangeInput}
              placeholder="Введите сообщение"
            />
            <SendMessageButton type="button" onClick={handleSendMessage}>
              <MdSend />
            </SendMessageButton>
          </div>
        </SendMessageContainer>
      </QueryWrapper>
    </Container>
  )
}

export default Chat
