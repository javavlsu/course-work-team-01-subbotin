import { Delete, Like, Post } from "dto/types/Posts"
import { Response } from "types/default"
import { File } from "../types/Files"

export const TestPost: Post = {
  id: 1,
  title: "Что такое Lorem Ipsum?",
  content:
    '<p><strong>Lorem Ipsum</strong> - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.</p> <p>В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</p>',
  likesCount: 100,
  commentsCount: 100,
  createdAt: new Date(2022, 10, 25).toDateString(),
  isMyLike: false,
  communityId: 1,
  attachments: []
}

export const PostsFakeData: Response<Post[]> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: [TestPost]
}

export const PostFakeData: Response<Post> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: TestPost
}

export const PostLikeFakeData: Response<Like> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: {
    isMyLike: true,
    count: 101
  }
}

export const PostDeleteFakeData: Response<Delete> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: true
}
