import socketIO from "socket.io-client"

const socket = socketIO(`${process.env.NEXT_PUBLIC_STREAM_SOCKET_URL}`, {
    reconnectionAttempts: 5,
    reconnectionDelay: 30000
})

export default socket