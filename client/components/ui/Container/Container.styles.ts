import styled, {
  css,
  FlattenSimpleInterpolation,
  DefaultTheme
} from "styled-components"

import {
  ContainerStyleType,
  ContainerType,
  StylesBase
} from "./Container.interface"

const getStylesByTypeAndColor = (
  type: ContainerType,
  styleType: ContainerStyleType,
  theme: DefaultTheme
): FlattenSimpleInterpolation => {
  let _color = ""

  switch (styleType) {
    case "primary":
      _color = theme.primary
      break
    case "dark":
      _color = theme.dark
      break
    case "light":
      _color = theme.light
      break
    default:
      _color = ""
      break
  }

  let _shadows: any = {}

  switch (styleType) {
    case "primary":
      _shadows = theme.shadows.primary
      break
    case "dark":
      _shadows = theme.shadows.dark
      break
    case "light":
      _shadows = theme.shadows.light
      break
    default:
      _shadows = {}
      break
  }

  switch (type) {
    case "1":
      return css`
        background: ${_color};
        box-shadow: -12px -12px 24px ${_shadows.main},
          12px 12px 24px ${_shadows.outline};
      `
    case "2":
      return css`
        background: ${_color};
        box-shadow: -10px -10px 20px ${_shadows.main},
          10px 10px 20px ${_shadows.outline},
          inset -4px -4px 8px ${_shadows.light},
          inset 4px 4px 8px ${_shadows.outline};
      `
    case "3":
      return css`
        background: ${_color};
        box-shadow: inset -12px -12px 24px ${_shadows.main},
          inset 12px 12px 24px ${_shadows.outline};
      `
    case "4":
      return css`
        background: ${_color};
        box-shadow: inset 12px 12px 24px ${_shadows.main},
          inset -12px -12px 24px ${_shadows.outline};
      `
    default:
      return css``
  }
}

export const Base = styled.div<StylesBase>`
  border-radius: 13px;
  padding: 10px;
  max-width: 100%;
  width: max-content;
  min-width: 100px;
  min-height: 100px;
  box-sizing: border-box;

  ${({ theme, type, styleType }) =>
    getStylesByTypeAndColor(
      type as ContainerType,
      styleType as ContainerStyleType,
      theme
    )}
`
