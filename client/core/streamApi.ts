import axios from "axios"
import MockAdapter from "axios-mock-adapter"

import { StreamFakeData, MessagesFakeData } from "dto/fakeData/Stream"

const axiosConfig = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_STREAM_API_URL}`,
    headers: {
        "Access-Control-Allow-Origin": `*`,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        Authorization:
            process.browser &&
            localStorage.getItem("token") &&
            `Bearer ${localStorage.getItem("token")}`
    }
})

const fakeApi = new MockAdapter(axiosConfig, { delayResponse: 1000 })

fakeApi.onGet("/stream?stream=teststream123").reply(200, StreamFakeData)
fakeApi.onGet("/stream/messages?stream=teststream123").reply(200, MessagesFakeData)

fakeApi.restore()

if (process.env.NODE_ENV === "production") {
    fakeApi.restore()
}

export default axiosConfig
