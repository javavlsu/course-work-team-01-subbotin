import styled from "styled-components"
import BaseImage from "next/image"

import { Container } from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "2"
}))`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 0;
  border-radius: 13px;

  svg {
    font-size: 24px;
  }
`

export const Image = styled(BaseImage).attrs(() => ({
  width: 100,
  height: 100,
  sizes: "100vw"
}))`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
  border-radius: 13px;
`

export const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
`

export const Filename = styled.span`
  position: absolute;
  bottom: 5px;
  left: 50%;
  font-size: 12px;
  line-height: 12px;
  transform: translateX(-50%);
  text-align: center;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 3;
`
