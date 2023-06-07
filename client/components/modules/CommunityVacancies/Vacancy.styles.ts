import styled from "styled-components"

export const Container = styled.div.attrs(() => ({
  className: "container2"
}))`
  padding: 20px !important;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 75px;
`

export const Title = styled.h1`
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  margin: 0;
  padding: 0;
`

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin: 0 auto 50px;
`
