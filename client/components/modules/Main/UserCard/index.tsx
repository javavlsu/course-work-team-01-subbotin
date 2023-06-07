import { FC, useState } from "react"
import { useRouter } from "next/router"

import { useUser, useMyCommunities } from "dto/hooks/User"

import { QueryWrapper } from "@container"
import { Avatar } from "@ui"
import CommunitySettings from "components/modules/CommunitySettings"
import { MdAddCircle } from "react-icons/md"

import { Community as ICommunity } from "dto/types/Communities"

import {
  Base,
  Content,
  Username,
  Communities,
  NoCommunities,
  SettingsButton,
  CreateCommunityLink,
  Link,
  Community,
  CommunitiesTitle
} from "./UserCard.styles"
import UserSettings from "../../UserSettings"

const UserCard: FC = () => {
  const router = useRouter()

  const { data: user } = useUser()
  const { data: communities, status: communitiesStatus } = useMyCommunities()

  const [isOpenUserSettings, setIsOpenUserSettings] = useState<boolean>(false)
  const [isOpenCreateCommunity, setIsOpenCreateCommunity] =
    useState<boolean>(false)

  const createCommunityReducer = {
    open: () => setIsOpenCreateCommunity(true),
    close: () => setIsOpenCreateCommunity(false)
  }

  const userSettingsReducer = {
    open: () => setIsOpenUserSettings(true),
    close: () => setIsOpenUserSettings(false)
  }

  const handleCreateCommunity = (community: ICommunity) => {
    router.push({
      pathname: "/communities/[id]",
      query: { id: community.id }
    })
  }

  return (
    <Base>
      <div>
        <Avatar
          img={user?.avatar || ""}
          alt={user?.username || ""}
          styleType="dark"
          size="middle"
        />
        <Username>{user?.username}</Username>
      </div>
      <Content>
        <QueryWrapper status={communitiesStatus}>
          <>
            <CommunitiesTitle>Ваши сообщества:</CommunitiesTitle>
            {!!communities?.length && (
              <Communities>
                {communities.map((item) => (
                  <Link
                    key={item.id}
                    href={{
                      pathname: "/communities/[id]",
                      query: { id: item.id }
                    }}>
                    <Community>
                      <Avatar
                        img={item.avatar || ""}
                        alt={item.name || ""}
                        styleType="dark"
                        size="small"
                      />
                      <div>
                        <p>{item.name}</p>
                        <span>Подписчиков: {item.followersCount}</span>
                      </div>
                    </Community>
                  </Link>
                ))}
              </Communities>
            )}
            {!communities?.length ? (
              <NoCommunities
                onClick={createCommunityReducer.open}
                styleType="dark">
                Вы пока не создали свои сообщества. Создать <MdAddCircle />
              </NoCommunities>
            ) : (
              <CreateCommunityLink onClick={createCommunityReducer.open}>
                Создать ещё
              </CreateCommunityLink>
            )}
          </>
        </QueryWrapper>
      </Content>
      <SettingsButton onClick={userSettingsReducer.open} />
      <UserSettings
        open={isOpenUserSettings}
        onClose={userSettingsReducer.close}
        userId={user?.id || ""}
      />
      <CommunitySettings
        open={isOpenCreateCommunity}
        onClose={createCommunityReducer.close}
        onSuccess={handleCreateCommunity}
      />
    </Base>
  )
}

export default UserCard
