import styled, { keyframes } from "styled-components"

const loaderAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Base = styled.div<{ size?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;

  div {
    width: ${({ size }) => size};
  }
`

export const DefaultLoader = styled.div`
  min-width: 1em;
  aspect-ratio: 1 / 1;
  background-color: transparent;
  border-width: 4px;
  border-style: solid;
  border-color: ${({ theme }) => theme.text.light};
  border-right-color: transparent;
  animation: 1s ${loaderAnimation} linear infinite;
  border-radius: 50%;
  overflow: hidden;
`
