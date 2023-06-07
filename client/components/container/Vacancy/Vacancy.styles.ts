import styled from "styled-components"

import { Button, Container } from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "1"
}))`
  min-height: 0;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
  gap: 25px;
`

export const Header = styled.div`
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.text.light};
`

export const Status = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

export const Time = styled.span`
  justify-self: flex-end;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 10px;
`

export const Title = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin: 0;
  padding: 0 0 20px;
`

export const Content = styled.div<{ isDetail?: boolean }>`
  width: 100%;
  overflow: hidden;
  min-height: 90px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

export const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const OpenAllButton = styled(Button)`
  padding: 0 25px;
  height: 50px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  gap: 10px;
  box-shadow: none;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  p {
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
  }
`
