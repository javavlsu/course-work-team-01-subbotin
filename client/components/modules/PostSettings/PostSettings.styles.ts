import styled from "styled-components"

import {
  Container,
  Textarea as BaseTextarea,
  Input as BaseInput,
  Form as BaseForm
} from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "1",
  styleType: "dark"
}))`
  min-height: 0;
  box-sizing: border-box;
  padding: 50px;
  width: 700px;
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

export const Textarea = styled(BaseTextarea).attrs(() => ({
  styleType: "dark"
}))`
  min-width: 0;
  width: 100%;
`
