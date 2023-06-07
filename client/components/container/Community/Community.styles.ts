import styled from "styled-components"
import BaseLink from "next/link"

import { Container, Button } from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "2"
}))`
  max-width: 350px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  gap: 20px;
`

export const Title = styled(BaseLink)`
  max-width: 100%;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: ${({ theme }) => theme.text.light};
`

export const Description = styled.p`
  flex: 1;
  font-style: normal;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 100px;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  color: ${({ theme }) => theme.text.light};
  font-size: 14px;
  line-height: 17px;
`

export const Controls = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
`

export const StreamButton = styled(Button)`
  padding: 0 25px;
  height: 50px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  gap: 10px;
`

export const StreamStatus = styled.span`
  min-width: 15px;
  width: 15px;
  height: 15px;
  background: #83ff8f;
  border-radius: 100%;
`
