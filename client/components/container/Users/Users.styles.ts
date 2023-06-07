import styled from "styled-components"

import { Container } from "@ui"

export const Base = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

export const User = styled(Container).attrs(() => ({
  type: "2",
  styleType: "primary"
}))`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 25px;
  min-width: 0;
  min-height: 0;
  padding: 20px 20px;
`

export const UserData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    flex: 1;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    margin: 0;
    padding: 0;
  }

  span {
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    margin: 0;
    padding: 0;

    &.date {
      font-weight: 200;
      font-size: 12px;
      line-height: 12px;
      text-align: right;
    }
  }
`
