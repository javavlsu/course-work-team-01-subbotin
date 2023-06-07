import styled, { css, FlattenSimpleInterpolation } from "styled-components"
import BaseImage from "next/image"

import { Container } from "@ui"

import { AvatarSizes, StylesBase } from "./Avatar.interface"

const getBaseSize = (size: AvatarSizes): FlattenSimpleInterpolation => {
  switch (size) {
    case "small":
      return css`
        min-width: 60px;
        width: 60px;
        height: 60px;
      `
    case "middle":
      return css`
        min-width: 150px;
        width: 150px;
        height: 150px;
      `
    case "large":
      return css`
        min-width: 300px;
        width: 300px;
        height: 300px;
      `
    default:
      return css`
        width: 100px;
        height: 100px;
      `
  }
}

const getImageContainerSize = (
  size: AvatarSizes
): FlattenSimpleInterpolation => {
  switch (size) {
    case "small":
      return css`
        min-width: 70px;
        width: 70px;
        height: 70px;
      `
    case "middle":
      return css`
        min-width: 125px;
        width: 125px;
        height: 125px;
      `
    case "large":
      return css`
        min-width: 250px;
        width: 250px;
        height: 250px;
      `
    default:
      return css`
        min-width: 100px;
        width: 100px;
        height: 100px;
      `
  }
}

export const Base = styled(Container).attrs(() => ({
  type: "2"
}))<StylesBase>`
  position: relative;
  min-width: 0;
  min-height: 0;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${({ size }) => getBaseSize(size)}
  &:hover {
    span {
      opacity: 1;
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s ease;
  }
`

export const ImageContainer = styled(Container).attrs(() => ({
  type: "4"
}))<StylesBase>`
  min-width: 0;
  min-height: 0;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${({ size }) => getImageContainerSize(size)}
`

export const Image = styled(BaseImage).attrs(() => ({
  width: 100,
  height: 100,
  sizes: "100vw"
}))`
  border-radius: 100%;
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
`
