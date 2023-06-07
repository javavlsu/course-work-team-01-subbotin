import tinycolor from "tinycolor2"

const getCorrectIndex = (number: number): number => number > 255 ? 255 : number < 0 ? 0 : number

export const generateUsernameColor = (hash: string): string => {
    const [r, g, b] = hash
    .substr(0, 3)
    .split("")
    .map((char) => getCorrectIndex(char.charCodeAt(0)))

    return tinycolor({ r, g, b }).lighten(20).saturate(20).toHexString()
}