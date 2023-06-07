import styled from "styled-components"
import tinycolor from "tinycolor2"

import { Button, Container } from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "1"
}))`
  min-height: 0;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
  gap: 25px;

  @media screen and (max-width: 1300px) {
    min-width: 0;
    max-width: 100%;
  }
`

export const Header = styled.div`
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.text.light};
`

export const Status = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

export const Time = styled.span`
  justify-self: flex-end;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 10px;
`

export const Title = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin: 0;
  padding: 0;
`

export const Content = styled.div<{ isDetail?: boolean }>`
  width: 100%;
  overflow: hidden;
  min-height: 90px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  .editor-text-underline {
    text-decoration: underline;
  }

  del {
    text-decoration: line-through;
  }

  .editor-text-underlineStrikethrough {
    text-decoration: underline line-through;
  }

  code {
    background-color: rgb(206, 208, 212);
    padding: 3px;
    font-family: Menlo, Consolas, Monaco, monospace;
    font-size: 94%;
  }

  a {
    color: #5899e2;
    text-decoration: none;
  }

  .editor-tokenComment {
    color: slategray;
  }

  .editor-tokenPunctuation {
    color: #999;
  }

  .editor-tokenProperty {
    color: #905;
  }

  .editor-tokenSelector {
    color: #690;
  }

  .editor-tokenOperator {
    color: #9a6e3a;
  }

  .editor-tokenAttr {
    color: #07a;
  }

  .editor-tokenVariable {
    color: #e90;
  }

  .editor-tokenFunction {
    color: #ffffff;
  }

  p {
    margin: 0 0 8px;
    position: relative;
  }

  p:last-child {
    margin-bottom: 0;
  }

  h1 {
    font-size: 24px;
    color: #ffffff;
    font-weight: 400;
    margin: 0 0 12px;
    padding: 0;
  }

  h2 {
    font-size: 15px;
    color: #ffffff;
    font-weight: 700;
    margin: 10px 0 0;
    padding: 0;
    text-transform: uppercase;
  }

  blockquote {
    margin: 0 0 0 20px;
    font-size: 15px;
    color: ${tinycolor("#ffffff").darken(20).toHexString()};
    border-left-color: rgb(206, 208, 212);
    border-left-width: 4px;
    border-left-style: solid;
    padding-left: 16px;
  }

  ul {
    padding: 0;
    margin: 0 0 0 16px;
  }

  ol {
    padding: 0;
    margin: 0 0 0 16px;
  }

  li {
    margin: 8px 32px 8px 32px;
  }

  li > li {
    list-style-type: none;
  }
`

export const Files = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const UserControls = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 30px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    justify-content: space-between;
  }
`

export const OpenAllButton = styled(Button)`
  padding: 0 25px;
  height: 50px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  gap: 10px;
  box-shadow: none;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
