import { FC } from "react"

import { useUser, useFollowedCommunities } from "dto/hooks/User"

import UserCard from "./UserCard"
import { QueryWrapper, Community } from "@container"

import { Container, Block, Title, Communities } from "./Main.styles"

const Main: FC = () => {
  const { data: user, status: userStatus } = useUser()
  const { data: followedCommunities, status: followedCommunitiesStatus } =
    useFollowedCommunities(!!user)

  return (
    <Container>
      <QueryWrapper status={userStatus}>
        {!!user && (
          <>
            <UserCard />
            <Block>
              <Title>Сообщества, на которые вы подписанны</Title>
              <QueryWrapper status={followedCommunitiesStatus}>
                <Communities>
                  {followedCommunities?.length
                    ? followedCommunities.map((item) => (
                        <Community key={item.id} {...item} />
                      ))
                    : "Вы не подписанны ни на одно сообщество"}
                </Communities>
              </QueryWrapper>
            </Block>
          </>
        )}
      </QueryWrapper>
    </Container>
  )
}

export default Main
