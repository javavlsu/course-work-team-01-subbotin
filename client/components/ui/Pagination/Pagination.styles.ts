import styled from "styled-components"
import tinycolor from "tinycolor2"

import { Button as ButtonBase } from "@ui"

export const Base = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Button = styled(ButtonBase)<{ isActive?: boolean }>`
  padding: 0;
  min-width: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme, isActive }) =>
    isActive && tinycolor(theme["dark"]).darken(2).toHexString()};
`
