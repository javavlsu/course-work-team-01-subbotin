import { Settings, User, Delete } from "dto/types/User"
import { Community } from "dto/types/Communities"
import { Response } from "types/default"

export const UserFakeData: Response<User | null> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data:
    process.browser && localStorage.getItem("token")
      ? {
          id: "test_user_id",
          avatar:
            "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
          username: "Test",
          email: "test@test.com"
        }
      : null
}

export const UserSettingsFakeData: Response<Settings> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: {
    id: "test_user_id",
    avatar:
      "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
    username: "Test",
    email: "test@test.com",
    password: "qweqweqwe"
  }
}

export const UserDeleteFakeData: Response<Delete> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: true
}

export const UserMyCommunitiesFakeData: Response<Community[]> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: [
    {
      id: 1,
      avatar: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      banner: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      name: "Homenick, Weissnat and Beier",
      description:
        "Nihil nostrum eos voluptatibus maxime nam reprehenderit. Fuga officiis perspiciatis quia et possimus voluptatem magni iure rerum. Dolorem consequatur unde quos quasi eos. Voluptatum ut dolore commodi exercitationem quis accusantium animi officiis. Maiores et totam harum unde voluptas quaerat et repudiandae tempore.",
      followersCount: 169,
      keywords: ["Tactics", "Infrastructure", "Florida"],
      isCommunityOwner: true,
      streamId: ""
    },
    {
      id: 600,
      avatar: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      banner: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      name: "Stanton Group",
      description:
        "Quaerat beatae cum minus. Unde qui consequatur voluptatem quos quo sit omnis. Vel expedita quos.",
      followersCount: 716,
      keywords: ["installation", "Account", "Tuna"],
      streamId: ""
    }
  ]
}

export const UserFollowedCommunitiesFakeData: Response<Community[]> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: [
    {
      id: 795,
      avatar: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      banner: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      name: "Ernser LLC",
      description:
        "Deserunt expedita dolorum voluptates. Impedit beatae quia molestiae culpa similique sint est inventore. Voluptatem officia quidem iusto nisi quasi culpa ut veniam. Eos voluptas excepturi. Qui eius maiores quod. Sint consequuntur unde ut dolor est sequi ex dolores.",
      followersCount: 176,
      keywords: ["Account", "Gorgeous", "Metal"],
      isMyFollow: true,
      streamId: ""
    },
    {
      id: 600,
      avatar: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      banner: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      name: "Stanton Group",
      description:
        "Quaerat beatae cum minus. Unde qui consequatur voluptatem quos quo sit omnis. Vel expedita quos.",
      followersCount: 716,
      keywords: ["installation", "Account", "Tuna"],
      isMyFollow: true,
      streamId: ""
    },
    {
      id: 620,
      avatar: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      banner: "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
      name: "Stanton Group",
      description:
        "Quaerat beatae cum minus. Unde qui consequatur voluptatem quos quo sit omnis. Vel expedita quos.",
      followersCount: 716,
      keywords: ["installation", "Account", "Tuna"],
      isMyFollow: true,
      streamId: ""
    }
  ]
}
