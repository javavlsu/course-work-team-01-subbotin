import styled from "styled-components"
import tinycolor from "tinycolor2"
import BaseLink from "next/link"

import { Container, Button } from "@ui"
import { MdSettings } from "react-icons/md"

export const Base = styled(Container).attrs(() => ({
  type: "2",
  styleType: "primary"
}))`
  position: relative;
  min-width: 0;
  max-width: 100%;
  width: 100%;
  padding: 20px 50px;
  display: flex;
  align-items: center;
  gap: 50px;
  margin-bottom: 80px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 25px;
  }
`

export const Content = styled.div`
  flex: 1;
  align-self: flex-start;
  margin-top: 20px;
`

export const Username = styled.h2`
  margin: 20px 0 0;
  text-align: center;
  padding: 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
`

export const Communities = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0 20px;
`

export const CommunitiesTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 16px;
`

export const NoCommunities = styled(Button).attrs(() => ({
  styleType: "dark"
}))`
  margin-top: 10px;
`

export const CreateCommunityLink = styled.p`
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  font-weight: bold;
  text-decoration: underline;
  line-height: 12px;
`

export const SettingsButton = styled(MdSettings)`
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 24px;
`

export const Link = styled(BaseLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.light};
`

export const Community = styled(Container).attrs(() => ({
  styleType: "dark"
}))`
  cursor: pointer;
  min-height: 0;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, styleType }) =>
      tinycolor(theme[styleType]).darken(2).toHexString()};
  }

  p {
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: bold;
    line-height: 14px;
  }

  span {
    font-size: 12px;
    line-height: 12px;
  }
`
