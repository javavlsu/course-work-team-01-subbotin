import styled from "styled-components"

import {
  Container,
  Input as BaseInput,
  Form as BaseForm,
  Button as BaseButton,
  Avatar as BaseAvatar
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

export const Avatar = styled(BaseAvatar).attrs(() => ({
  styleType: "dark"
}))`
  position: relative;
  margin: 0 auto;
`

export const Input = styled(BaseInput).attrs(() => ({
  styleType: "dark"
}))`
  min-width: 0;
  width: 100%;
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

export const LogoutButton = styled(BaseButton).attrs(() => ({
  styleType: "dark"
}))`
  min-width: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  svg {
    font-size: 24px;
  }
`

export const DeleteButton = styled(BaseButton).attrs(() => ({
  styleType: "dark"
}))`
  min-width: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  svg {
    fill: #ff5154;
    font-size: 24px;
  }
`
