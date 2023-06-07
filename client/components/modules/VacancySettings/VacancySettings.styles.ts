import styled from "styled-components"

import {
  Container,
  Textarea as BaseTextarea,
  Input as BaseInput,
  Form as BaseForm,
  Button as BaseButton
} from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "1",
  styleType: "dark"
}))`
  min-height: 0;
  box-sizing: border-box;
  padding: 50px;
  width: 1000px;
`

export const Title = styled.h1`
  margin: 0 0 40px;
  padding: 0;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
`

export const Form = styled(BaseForm)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Input = styled(BaseInput).attrs(() => ({
  styleType: "dark"
}))`
  min-width: 0;
  width: 100%;
`

export const SalaryBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33%);
  gap: 15px;
  box-sizing: border-box;
`

export const Textarea = styled(BaseTextarea).attrs(() => ({
  styleType: "dark"
}))`
  min-width: 0;
  width: 100%;
`

export const KeywordsField = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  gap: 20px;
`

export const KeywordsFieldAdd = styled(BaseButton).attrs(() => ({
  styleType: "dark"
}))`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
`

export const Keywords = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

export const Controls = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`

export const SendButton = styled(BaseButton).attrs(() => ({
  styleType: "dark"
}))`
  flex: 1;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`
