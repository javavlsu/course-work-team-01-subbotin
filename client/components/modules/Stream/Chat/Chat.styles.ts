import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import { generateUsernameColor } from "./utils"

import { Container as BaseContainer, Textarea as BaseTextarea, Button as BaseButton } from "@ui"

import {StylesMessage} from './Chat.interface';

export const Container = styled(BaseContainer).attrs(() => ({
    type: "3",
    styleType: "dark"
}))`
  max-width: 100%;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
`

export const Messages = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 30px 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: auto;
`

export const Message = styled.p<StylesMessage>`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 14px;
  
  span {
    font-weight: bold;
    color: ${({ username }) => generateUsernameColor(username)}
  }
`

export const SendMessageContainer = styled.div`
  width: 100%;
  height: max-content;
  box-sizing: border-box;
  
  div {
    padding: 10px 15px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
`

export const SendMessageInput = styled(BaseTextarea).attrs(() => ({
    styleType: "light"
}))`
  max-width: 100%;
  flex: 1;
`

export const SendMessageButton = styled(BaseButton).attrs(() => ({
    styleType: 'light'
}))`
  min-width: 60px;
  width: 60px;
  height: 60px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
`