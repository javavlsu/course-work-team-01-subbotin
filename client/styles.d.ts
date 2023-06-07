import "styled-components"

declare module "react-intersection-observer"

declare module "styled-components" {
  export interface DefaultTheme {
    light: string
    dark: string
    primary: string
    text: {
      light: string
      dark: string
      primary: string
    }
    shadows: {
      light: {
        main: string
        outline: string
        light: string
      }
      dark: {
        main: string
        outline: string
        light: string
      }
      primary: {
        main: string
        outline: string
        light: string
      }
    }
  }
}
