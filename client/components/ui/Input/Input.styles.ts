import styled from "styled-components"

import { Container } from "@ui"

import { InputValidationType } from "./Input.interface"

export const Base = styled.div`
  max-width: 100%;
  width: 250px;
  transition: all 0.3s ease;
`

export const FieldBase = styled(Container).attrs(() => ({
  type: "2"
}))`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0 15px;
  padding: 0 20px;
  height: 60px;
  min-height: 0;
`

export const Field = styled.input`
  flex: 1;
  padding: 0;
  height: 100%;
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.text.light};
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  &::placeholder {
    font-weight: 300;
  }
`

export const FieldValidation = styled.div<{ type?: InputValidationType }>`
  svg {
    font-size: 24px;
    fill: ${({ theme, type }) =>
      type === "error"
        ? "#AC0000"
        : type === "success"
        ? "#32C000"
        : theme.text.light};
  }
`

export const Description = styled.p<{ type?: InputValidationType }>`
  margin: 10px 0 0;
  padding: 0;
  color: ${({ theme, type }) =>
    type === "error" ? "#AC0000" : theme.text.light};
`
