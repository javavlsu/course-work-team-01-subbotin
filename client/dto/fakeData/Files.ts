import { File } from "dto/types/Files"
import { Response } from "types/default"

export const TestFiles: File[] = [
  {
    id: 1,
    type: "image",
    url: "https://sun9-30.userapi.com/impg/_hGpPSIUqmlbjlHS0VCO1XBE2ALgoBN3PFXxnw/ov4HNKptc70.jpg?size=2560x1707&quality=95&sign=03c776dc8006f09953e9f4161c1da217&type=album",
    name: "file.test"
  },
  {
    id: 2,
    type: "video",
    url: "https://res.cloudinary.com/dwtd9mmad/video/upload/v1669663918/Metal_Wind_Chimes_at_Sunset_preview_w34nz4.mp4",
    name: "file.test"
  },
  {
    id: 3,
    type: "audio",
    url: "https://res.cloudinary.com/dwtd9mmad/video/upload/v1669664251/doom_eternal_22._The_Only_Thing_They_Fear_Is_You_rm1a7w.mp3",
    name: "file.test"
  },
  {
    id: 4,
    type: "document",
    url: "https://res.cloudinary.com/dwtd9mmad/raw/upload/v1669664404/%D0%98%D0%A1%D0%A2220-%D0%A2%D0%9F%D0%9E_2-%D0%A1%D1%83%D0%B1%D0%B1%D0%BE%D1%82%D0%B8%D0%BD_sqenes.docx",
    name: "file.test"
  },
  {
    id: 5,
    type: "image",
    url: "https://sun9-30.userapi.com/impg/_hGpPSIUqmlbjlHS0VCO1XBE2ALgoBN3PFXxnw/ov4HNKptc70.jpg?size=2560x1707&quality=95&sign=03c776dc8006f09953e9f4161c1da217&type=album",
    name: "file.test"
  },
  {
    id: 6,
    type: "audio",
    url: "https://res.cloudinary.com/dwtd9mmad/video/upload/v1669664251/doom_eternal_22._The_Only_Thing_They_Fear_Is_You_rm1a7w.mp3",
    name: "file.test"
  },
  {
    id: 7,
    type: "document",
    url: "https://res.cloudinary.com/dwtd9mmad/raw/upload/v1669664404/%D0%98%D0%A1%D0%A2220-%D0%A2%D0%9F%D0%9E_2-%D0%A1%D1%83%D0%B1%D0%B1%D0%BE%D1%82%D0%B8%D0%BD_sqenes.docx",
    name: "file.test"
  }
]

export const FilesFakeData: Response<File[]> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: TestFiles
}

export const FileUploadFakeData: Response<File> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: {
    id: 1,
    type: "image",
    url: "https://sun9-30.userapi.com/impg/_hGpPSIUqmlbjlHS0VCO1XBE2ALgoBN3PFXxnw/ov4HNKptc70.jpg?size=2560x1707&quality=95&sign=03c776dc8006f09953e9f4161c1da217&type=album",
    name: "file.test"
  }
}
