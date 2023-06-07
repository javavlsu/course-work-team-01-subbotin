import styled from "styled-components"

export const Container = styled.div.attrs(() => ({
  className: "container2"
}))`
  padding: 20px !important;
`

export const Title = styled.h1`
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  margin: 0 0 50px;
  padding: 0;
`

export const Cards = styled.div`
  margin: 0 auto 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 350px));
  justify-content: space-evenly;
  gap: 35px;
`
