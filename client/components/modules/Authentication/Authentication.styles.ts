import styled from "styled-components"

import { Button, Container, Input as BaseInput } from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "1",
  styleType: "dark"
}))`
  min-width: 0;
  min-height: 0;
  padding: 100px 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 50px 25px;
  }
`

export const Title = styled.h1`
  margin: 0 0 85px;
  padding: 0;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  line-height: 49px;
`

export const Fields = styled.div`
  min-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  margin-bottom: 40px;

  @media screen and (max-width: 375px) {
    min-width: 0;
  }
`

export const Input = styled(BaseInput).attrs(() => ({
  styleType: "dark"
}))`
  width: 100%;
`

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const Question = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  span {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-decoration-line: underline;
    cursor: pointer;
  }
`

export const SendButton = styled(Button).attrs(() => ({
  styleType: "dark"
}))`
  width: 300px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
