import styled from "styled-components"

import { Button, Container } from "@ui"
import { MdDelete, MdEdit } from "react-icons/md"

export const Base = styled(Container).attrs(() => ({
  type: "1"
}))`
  min-width: 700px;
  min-height: 0;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
  gap: 25px;

  @media screen and (max-width: 1300px) {
    min-width: 0;
    max-width: 100%;
  }
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
  padding: 0;
`

export const Content = styled.div<{ isDetail?: boolean }>`
  width: 100%;
  overflow: hidden;
  min-height: 90px;
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

export const OwnerControls = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 30px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`

export const OwnerControlsEdit = styled(MdEdit)`
  cursor: pointer;
  font-size: 24px;
`

export const OwnerControlsDelete = styled(MdDelete)`
  cursor: pointer;
  font-size: 24px;
  fill: #ff5154;
`

export const UserControls = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 30px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    justify-content: space-between;
  }
`

export const OpenResponsesButton = styled(Button).attrs(() => ({
  styleType: "primary"
}))`
  padding: 10px 25px;
  box-shadow: none;
`

export const Users = styled.div`
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
