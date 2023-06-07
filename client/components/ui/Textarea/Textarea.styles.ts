import styled from "styled-components"

import { Container } from "@ui"

import { TextareaValidationType } from "./Textarea.interface"

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
  align-items: flex-start;
  gap: 0 15px;
  padding: 10px 20px;
  min-height: 0;
`

export const Field = styled.textarea`
  flex: 1;
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.text.light};
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  min-height: max-content;
  height: max-content;
  overflow: hidden;
  resize: none;

  &::placeholder {
    font-weight: 300;
  }
`

export const FieldValidation = styled.div<{ type?: TextareaValidationType }>`
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

export const Description = styled.p<{ type?: TextareaValidationType }>`
  margin: 10px 0 0;
  padding: 0;
  color: ${({ theme, type }) =>
    type === "error" ? "#AC0000" : theme.text.light};
`
