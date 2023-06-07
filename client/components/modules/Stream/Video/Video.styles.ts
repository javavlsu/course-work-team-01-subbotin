import styled from "styled-components"

export const Base = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 25px 20px;
`

export const Text = styled.div`
  flex: 1;
`

export const Title = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 26px;
  line-height: 26px;
`

export const Description = styled.p`
  padding: 0;
  margin: 15px 0 0;
  font-size: 16px;
  line-height: 16px;
`

export const Tag = styled.div`
  background-color: #ff5154;
  color: ${({ theme }) => theme.text.light};
  padding: 10px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  height: max-content;
`

export const Stream = styled.video`
  width: 100%;
  max-height: 700px;
  height: 100%;
  background-color: #000;
`
