import styled, { keyframes } from "styled-components"

import { Button } from "@ui"
import { MdDelete } from "react-icons/md"

import { UploadValidationType } from "./Upload.interface"

export const loaderAnimation = keyframes`
  0%, 75%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
`

export const Base = styled.div`
  transition: all 0.2s ease;
`

export const Field = styled.div`
  cursor: pointer;
  position: relative;
  width: auto;
  max-width: 100%;
`

export const FieldInput = styled.input`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
`

export const FieldTrigger = styled.div`
  max-width: 100%;
  cursor: pointer;
`

export const FieldButton = styled(Button)`
  padding: 0 25px;
  height: 50px;
`

export const Files = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`

export const FileBlock = styled.div`
  position: relative;
`

export const FileDelete = styled(MdDelete)`
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
`

export const Loader = styled.div`
  display: flex;
  gap: 5px;

  span {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.text.light};
    animation: ${loaderAnimation} 1s ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: 1s;
    }

    &:nth-child(2) {
      animation-delay: 0.33s;
    }

    &:nth-child(3) {
      animation-delay: 0.66s;
    }
  }
`

export const Description = styled.p<{ type?: UploadValidationType }>`
  margin: 10px 0 0;
  padding: 0;
  color: ${({ theme, type }) =>
    type === "error" ? "#AC0000" : theme.text.light};
`
