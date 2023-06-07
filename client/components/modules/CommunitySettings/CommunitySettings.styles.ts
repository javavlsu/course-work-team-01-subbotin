import styled from "styled-components"
import BaseImage from "next/image"

import {
  Container,
  Textarea as BaseTextarea,
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

export const Banner = styled(Container).attrs(() => ({
  type: "2",
  styleType: "dark"
}))`
  position: relative;
  min-height: 0;
  min-width: 0;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    span {
      opacity: 1;
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 13px;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s ease;
  }
`

export const BannerImage = styled(BaseImage).attrs(() => ({
  fill: true
}))`
  object-position: center;
  object-fit: cover;
  border-radius: 13px;
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
