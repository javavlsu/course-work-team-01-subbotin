import { Community, Delete, Follow } from "dto/types/Communities"
import { Response } from "types/default"

export const TestCommunity: Community = {
  id: 1,
  avatar:
    "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
  banner:
    "https://res.cloudinary.com/dwtd9mmad/image/upload/v1684077950/aveqj8rmhmgkc9lpym2y.jpg",
  name: "Homenick, Weissnat and Beier",
  description:
    "Nihil nostrum eos voluptatibus maxime nam reprehenderit. Fuga officiis perspiciatis quia et possimus voluptatem magni iure rerum. Dolorem consequatur unde quos quasi eos. Voluptatum ut dolore commodi exercitationem quis accusantium animi officiis. Maiores et totam harum unde voluptas quaerat et repudiandae tempore.",
  followersCount: 169,
  keywords: ["Tactics", "Infrastructure", "Florida"],
  isCommunityOwner: true,
  streamId: "teststream123"
}

export const CommunitiesFakeData: Response<Community[]> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: [TestCommunity]
}

export const CommunityFakeData: Response<Community> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: TestCommunity
}

export const CommunityFollowFakeData: Response<Follow> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: {
    isMyFollow: true,
    count: 170
  }
}

export const CommunityDeleteFakeData: Response<Delete> = {
  status: 200,
  message: "Запрос успешно выполнен",
  data: true
}
