import { DefaultTheme } from "styled-components"
import tinycolor from "tinycolor2"

const theme: DefaultTheme = {
  light: "#333333",
  dark: "#252525",
  primary: "#F3672B",
  text: {
    light: "#FFFFFF",
    dark: "#000",
    primary: "#FFFFFF"
  },
  shadows: {
    light: {
      main: "#3E3E3E",
      outline: "#1E1E1E",
      light: tinycolor("#4D4D4D").setAlpha(25).toHexString()
    },
    dark: {
      main: "#222222",
      outline: "#1C1C1C",
      light: tinycolor("#272727").setAlpha(25).toHexString()
    },
    primary: {
      main: "#F4743B",
      outline: "#F25918",
      light: tinycolor("#F58351").setAlpha(25).toHexString()
    }
  }
}

export default theme
