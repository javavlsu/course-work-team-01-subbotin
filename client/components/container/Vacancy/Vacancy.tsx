import { FC } from "react"
import { formatDistanceToNow } from "date-fns"
import ruLocale from "date-fns/locale/ru"
import { useRouter } from "next/router"

import { VacancyProps } from "./Vacancy.interface"

import {
  Base,
  Content,
  Header,
  OpenAllButton,
  Status,
  Time,
  Title,
  Controls,
  Data
} from "./Vacancy.styles"

const Vacancy: FC<VacancyProps> = ({ vacancy, styleType = "light" }) => {
  const router = useRouter()
  const { query, pathname, replace } = router

  const handleOpenDetail = () => {
    const _query = {
      ...query,
      vacancy: vacancy.id
    }

    return replace({ pathname, query: _query }, undefined, { shallow: true })
  }

  return (
    <Base styleType={styleType}>
      <Header>
        <Status>
          <div></div>
          <Time>
            {formatDistanceToNow(new Date(vacancy.createdAt), {
              addSuffix: true,
              locale: ruLocale
            })}
          </Time>
        </Status>
        <Title>{vacancy.title}</Title>
        <Data>
          <p>
            Зарплата от {`${vacancy.minSalary}${vacancy.currency}`}
            {vacancy.maxSalary
              ? ` до ${vacancy.maxSalary}${vacancy.currency}`
              : ""}
          </p>
        </Data>
      </Header>
      <Content
        dangerouslySetInnerHTML={{
          __html: vacancy.content
        }}
      />
      <Controls>
        <OpenAllButton onClick={handleOpenDetail} styleType="primary">
          Открыть полностью
        </OpenAllButton>
      </Controls>
    </Base>
  )
}

export default Vacancy
