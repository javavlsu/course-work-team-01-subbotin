import styled from "styled-components"
import BaseImage from "next/image"

import { Container as BaseContainer } from "@ui"

export const Container = styled.section`
  position: relative;
  padding-bottom: 20px;
`

export const Banner = styled(BaseImage).attrs(() => ({
  width: 100,
  height: 100,
  sizes: "100vw"
}))`
  max-height: 200px;
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
`

export const Content = styled.div.attrs(() => ({
  className: "container"
}))`
  position: relative;
  margin: 20px auto 50px;
  display: grid;
  grid-template-columns: 400px 700px;
  gap: 100px;
  justify-content: space-between;
  align-items: start;
  padding: 30px 0 20px !important;

  @media screen and (max-width: 1300px) {
    grid-template-columns: 100%;
    gap: 100px;
    margin-bottom: 0;
  }
`

export const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: 100%;
`

export const Vacancies = styled(BaseContainer).attrs(() => ({
  type: "2",
  styleType: "primary"
}))`
  position: relative;
  width: 100%;
  padding: 35px;
  display: flex;
  flex-direction: column;
  gap: 35px;

  @media screen and (max-width: 1300px) {
    align-items: center;
  }
`

export const VacanciesTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  width: 100%;
`

export const VacanciesContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-style: solid;
  border-color: ${({ theme }) => theme.text.light};
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-left: 0;
  border-right: 0;
  padding: 25px 0;

  @media screen and (max-width: 1300px) {
    align-items: center;
  }
`

export const MinVacancy = styled(BaseContainer).attrs(() => ({
  type: "1",
  styleType: "dark"
}))`
  cursor: pointer;
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  gap: 25px;

  h3,
  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 14px;
  }

  h3 {
    font-weight: 700;
  }
`

export const Posts = styled.div`
  padding: 20px 0 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media screen and (max-width: 1300px) {
    align-items: center;
  }
`
