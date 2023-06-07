import { FC, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import { useById } from "@dto/hooks/Communities"
import { useAll } from "@dto/hooks/Posts"
import { useLastVacancies } from "@dto/hooks/Vacancy"

import Info from "./Info"
import { Post, QueryWrapper } from "@container"
import { Button } from "@ui"
import PostSettings from "@modules/PostSettings"

import {
  Banner,
  Container,
  Content,
  MinVacancy,
  Posts,
  RightBlock,
  Vacancies,
  VacanciesContent,
  VacanciesTitle
} from "./Community.styles"
import { useRouter } from "next/router"

const Community: FC = () => {
  const router = useRouter()
  const { push, replace, query, pathname } = router
  const { ref: loadNextRef, inView } = useInView()

  const { data: communityData, status: communityStatus } = useById()
  const { data: lastVacancies, status: lastVacanciesStatus } =
    useLastVacancies()
  const {
    data: postsData,
    status: postsStatus,
    refetch: refetchAllPosts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useAll()

  const [isOpenCreatePost, setIsOpenCreatePost] = useState<boolean>(false)

  const createPostReducer = {
    open: () => setIsOpenCreatePost(true),
    close: () => setIsOpenCreatePost(false)
  }

  const handleUpdatePosts = () => {
    createPostReducer.close()
    refetchAllPosts()
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const handleOpenVacancies = () => {
    return push(`/communities/${communityData?.id}/vacancies`)
  }

  const handleOpenVacancyDetail = (id: number) => {
    const _query = {
      ...query,
      vacancy: id
    }

    return replace({ pathname, query: _query }, undefined, { shallow: true })
  }

  return (
    <>
      <Container>
        <Banner
          src={communityData?.banner || ""}
          alt={communityData?.name || ""}
        />
        <Content>
          <Info communityId={communityData?.id || 0} />
          <RightBlock>
            <QueryWrapper status={lastVacanciesStatus}>
              <Vacancies>
                <VacanciesTitle>Последние вакансии</VacanciesTitle>
                <VacanciesTitle>
                  <VacanciesContent>
                    {lastVacancies?.length
                      ? lastVacancies?.map((item) => (
                          <MinVacancy
                            key={item.id}
                            onClick={() => handleOpenVacancyDetail(item.id)}>
                            <h3>{item.title}</h3>
                            <p>
                              от {`${item.minSalary}${item.currency}`}
                              {item.maxSalary
                                ? ` до ${item.maxSalary}${item.currency}`
                                : ""}
                            </p>
                          </MinVacancy>
                        ))
                      : "Нет вакансий"}
                  </VacanciesContent>
                </VacanciesTitle>
                <Button onClick={handleOpenVacancies} styleType="dark">
                  Все вакансии
                </Button>
              </Vacancies>
            </QueryWrapper>
            <Posts>
              {communityData?.isCommunityOwner && (
                <Button onClick={createPostReducer.open} styleType="dark">
                  Создать пост
                </Button>
              )}
              <QueryWrapper status={postsStatus}>
                <>
                  {postsData?.pages.map((page) => (
                    <>
                      {page.data.items.map((item, index) =>
                        page.data.items.length === index + 1 ? (
                          <div ref={loadNextRef}>
                            <Post
                              key={item.id}
                              styleType="dark"
                              isOwner={!!communityData?.isCommunityOwner}
                              communityName={communityData?.name || ""}
                              post={item}
                            />
                          </div>
                        ) : (
                          <Post
                            key={item.id}
                            styleType="dark"
                            isOwner={!!communityData?.isCommunityOwner}
                            communityName={communityData?.name || ""}
                            post={item}
                          />
                        )
                      )}
                    </>
                  ))}
                </>
                {isFetchingNextPage && <h3>Loading...</h3>}
              </QueryWrapper>
            </Posts>
          </RightBlock>
        </Content>
      </Container>
      {communityStatus === "success" && (
        <PostSettings
          open={isOpenCreatePost}
          onClose={createPostReducer.close}
          isModal
        />
      )}
    </>
  )
}

export default Community
