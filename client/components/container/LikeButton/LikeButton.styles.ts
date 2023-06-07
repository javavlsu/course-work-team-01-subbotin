import styled from "styled-components"

import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import { Button as ButtonBase } from "@ui"

export const Base = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`

export const Button = styled(ButtonBase)`
  padding: 0;
  min-width: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
`

export const Icon = styled(MdFavoriteBorder)`
  font-size: 30px;
`

export const IconLiked = styled(MdFavorite)`
  font-size: 30px;
  fill: #ffffff;
`

export const Count = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.text.light};
`
