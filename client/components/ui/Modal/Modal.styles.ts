import styled from "styled-components"

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;
  z-index: 100;
  height: 100%;
`

export const Portal = styled.div`
  position: fixed;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  outline: 0;
  z-index: 105;
  padding: 2% 0;
  color: ${({ theme }) => theme.text.light};
`

export const Base = styled.div`
  position: relative;
  transition: all 0.2s ease;
  min-width: 200px;
  box-sizing: border-box;
  width: max-content;
  max-width: 95%;
  margin: 0 auto;
`
