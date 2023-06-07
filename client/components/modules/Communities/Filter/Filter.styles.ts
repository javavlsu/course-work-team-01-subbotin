import styled from "styled-components"

import { Input as BaseInput, Container } from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "1",
  styleType: "light"
}))`
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 25px;
  min-height: 0;
  margin-bottom: 70px;

  @media screen and (max-width: 768px) {
    margin-bottom: 50px;
  }
`

export const Input = styled(BaseInput)`
  width: 500px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
