import styled, { keyframes } from "styled-components"
import tinycolor from "tinycolor2"

import { StylesBase } from "./Button.interface"

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Base = styled.button<StylesBase>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 50px;
  gap: 15px;
  border: 0;
  border-radius: 27px;
  background: ${({ theme, styleType }) => theme[styleType]};
  box-shadow: -12px -12px 24px ${({ theme, styleType }) => theme.shadows[styleType].main},
    12px 12px 24px ${({ theme, styleType }) => theme.shadows[styleType].outline};
  color: ${({ theme }) => theme.text.light};
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, styleType }) =>
      tinycolor(theme[styleType]).darken(2).toHexString()};
  }
`

export const ButtonLoader = styled.div`
  width: 20px;
  height: 20px;
  border-width: 3px;
  border-style: solid;
  border-right-color: transparent;
  border-top-color: ${({ theme }) => theme.text.light};
  border-radius: 50%;
  animation: ${rotateAnimation} 0.8s linear infinite;
`
