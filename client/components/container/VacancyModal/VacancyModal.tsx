import { FC, useCallback, useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import ruLocale from "date-fns/locale/ru"
import { useRouter } from "next/router"

import {
  useGetVacancyById,
  useRespondVacancy,
  useDeleteVacancy,
  useVacancyResponses
} from "dto/hooks/Vacancy"

import { Button, Modal } from "@ui"
import { LikeButton, QueryWrapper, Users } from "@container"
import VacancySettings from "@modules/VacancySettings"

import {
  Base,
  Content,
  Header,
  OwnerControls,
  Controls,
  OwnerControlsDelete,
  OwnerControlsEdit,
  Status,
  Time,
  UserControls,
  Title,
  OpenResponsesButton
} from "./VacancyModal.styles"

const VacancyModal: FC = () => {
  const router = useRouter()
  const { query, replace, pathname } = router
  const { vacancy } = query

  const [isLike, setIsLike] = useState<boolean>()
  const [likeCount, setLikeCount] = useState<number>()
  const [renderType, setRenderType] = useState<
    "content" | "responses" | "edit"
  >("content")

  const { data: vacancyData, status: vacancyStatus } = useGetVacancyById()
  const { data: responses, status: responsesStatus } = useVacancyResponses(
    renderType === "responses"
  )
  const { mutateAsync: respond } = useRespondVacancy()
  const { mutateAsync: deleteVacancy } = useDeleteVacancy()

  const onClose = () => {
    setRenderType("content")
    delete query.vacancy

    return replace({ pathname, query }, undefined, { shallow: true })
  }

  const settingReducer = {
    open: () => setRenderType("edit"),
    close: () => setRenderType("content"),
    responses: () => setRenderType("responses")
  }

  const handleRespond = () =>
    respond().then((result) => {
      setIsLike(result.isMyResponse)
      setLikeCount(result.count)
    })

  const handleDelete = () => deleteVacancy().then(() => onClose())

  const render = useCallback(() => {
    switch (renderType) {
      case "content":
        return (
          <>
            <Content
              isDetail
              dangerouslySetInnerHTML={{
                __html: vacancyData?.content || ""
              }}
            />
            <Controls>
              {vacancyData?.isCommunityOwner && (
                <OwnerControls>
                  <OwnerControlsEdit onClick={settingReducer.open} />
                  <OwnerControlsDelete onClick={handleDelete} />
                  <OpenResponsesButton onClick={settingReducer.responses}>
                    Отклики
                  </OpenResponsesButton>
                </OwnerControls>
              )}
              {!vacancyData?.isCommunityOwner && (
                <UserControls>
                  <LikeButton
                    count={likeCount}
                    liked={isLike}
                    onLike={handleRespond}
                    styleType="primary"
                  />
                </UserControls>
              )}
            </Controls>
          </>
        )
      case "edit":
        return (
          <VacancySettings
            open={renderType === "edit"}
            onClose={settingReducer.close}
          />
        )
      case "responses":
        return (
          <QueryWrapper status={responsesStatus}>
            <Users users={responses} notFoundText="Нет откликов" />
          </QueryWrapper>
        )
      default:
        return <></>
    }
  }, [
    handleDelete,
    handleRespond,
    isLike,
    likeCount,
    renderType,
    responses,
    responsesStatus,
    settingReducer.close,
    settingReducer.open,
    settingReducer.responses,
    vacancyData?.content,
    vacancyData?.isCommunityOwner
  ])

  useEffect(() => {
    setIsLike(!!vacancyData?.isMyResponse)
    setLikeCount(vacancyData?.responsesCount || 0)
  }, [vacancyData])

  return (
    <Modal open={!!vacancy} onClose={onClose}>
      <Base styleType="dark">
        <QueryWrapper status={vacancyStatus}>
          <Header>
            <Status>
              <div></div>
              <Time>
                {!!vacancyData?.createdAt &&
                  formatDistanceToNow(new Date(vacancyData?.createdAt), {
                    addSuffix: true,
                    locale: ruLocale
                  })}
              </Time>
            </Status>
            <Title>{vacancyData?.title}</Title>
          </Header>
          {render()}
          {renderType !== "content" && (
            <Button onClick={settingReducer.close}>Назад</Button>
          )}
        </QueryWrapper>
      </Base>
    </Modal>
  )
}

export default VacancyModal
