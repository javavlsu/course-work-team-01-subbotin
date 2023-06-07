import styled from "styled-components"

import { Container as BaseContainer, Button as BaseButton } from "@ui"
import { MdSettings } from "react-icons/md"

export const Container = styled.div`
  position: sticky;
  top: 1rem;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: max-content;
  align-self: start;

  @media screen and (max-width: 1300px) {
    align-items: center;
    position: relative;
  }
`

export const Card = styled(BaseContainer).attrs(() => ({
  type: "2",
  styleType: "primary"
}))`
  position: relative;
  width: 100%;
  padding: 25px;

  h1 {
    margin: 0 0 20px;
    padding: 0;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
  }
`

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  div {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    span {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
    }
  }
`

export const CardSettings = styled(MdSettings)`
  position: absolute;
  cursor: pointer;
  bottom: 25px;
  right: 25px;
  font-size: 24px;
`

export const StreamButton = styled(BaseButton).attrs(() => ({
  styleType: "dark"
}))`
  width: 100%;
  height: 50px;
  justify-content: space-between;
  padding: 20px 25px;
  border-radius: 13px;
`

export const StreamStatus = styled.div<{ isOnline: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  span {
    min-width: 15px;
    width: 15px;
    height: 15px;
    background: ${({ isOnline }) => (isOnline ? "#83ff8f" : "#FF5154")};
    border-radius: 100%;
  }
`

export const Description = styled(BaseContainer).attrs(() => ({
  type: "2",
  styleType: "primary"
}))`
  width: 100%;
  padding: 20px;

  h3 {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
  }

  span {
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.text.light};
    margin: 15px 0 10px;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`

export const Tags = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`

export const ShowAllButton = styled(BaseButton)`
  width: 100%;
`

export const UsersBase = styled(BaseContainer).attrs(() => ({
  type: "1"
}))`
  min-width: 700px;
  min-height: 0;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: 25px;

  @media screen and (max-width: 1300px) {
    min-width: 0;
    max-width: 100%;
  }
`
