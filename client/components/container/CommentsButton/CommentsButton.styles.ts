import styled from "styled-components"

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

  svg {
    font-size: 30px;
  }
`

export const Count = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.text.light};
`
