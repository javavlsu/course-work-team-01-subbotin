import { FC, useState } from "react"
import { useRouter } from "next/router"

import { useById } from "@dto/hooks/Communities"
import { useVacancies } from "dto/hooks/Vacancy"

import { Vacancy, QueryWrapper } from "@container"
import VacancySettings from "@modules/VacancySettings"
import { Button, Pagination } from "@ui"

import { Container, Cards, Header, Title } from "./Vacancy.styles"

const CommunityVacancies: FC = () => {
  const router = useRouter()
  const { push, query } = router
  const { id: communityId } = query

  const { data: communityData, status: communityStatus } = useById()
  const { data, status } = useVacancies()

  const [isOpenCreateVacancy, setIsOpenCreateVacancy] = useState<boolean>(false)

  const handleChangePage = (page: number) => {
    return push(`/communities/${communityId}/vacancies?page=${page}`)
  }

  const createVacancyReducer = {
    open: () => setIsOpenCreateVacancy(true),
    close: () => setIsOpenCreateVacancy(false)
  }

  return (
    <>
      <Container>
        <QueryWrapper status={status}>
          <Header>
            <Title>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Вакансии сообщества "{communityData?.name}"
            </Title>
            {communityData?.isCommunityOwner && (
              <Button onClick={createVacancyReducer.open} styleType="dark">
                Создать вакансию
              </Button>
            )}
          </Header>
          {!!data && (
            <>
              <Cards>
                {data?.count
                  ? data?.items?.map((item) => (
                      <Vacancy key={item.id} vacancy={item} />
                    ))
                  : "В сообществе пока нет вакансий"}
              </Cards>
              <Pagination
                currentPage={data.page}
                total={data.count}
                pageSize={data.limit}
                onChange={handleChangePage}
              />
            </>
          )}
        </QueryWrapper>
      </Container>
      {communityStatus === "success" && (
        <VacancySettings
          open={isOpenCreateVacancy}
          onClose={createVacancyReducer.close}
          isModal
        />
      )}
    </>
  )
}

export default CommunityVacancies
