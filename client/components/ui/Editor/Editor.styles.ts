import styled from "styled-components"
import BaseTippy, { TippyProps } from "@tippyjs/react"
import tinycolor from "tinycolor2"

import "tippy.js/dist/tippy.css"
import "tippy.js/themes/light.css"

import { Button as ButtonBase, Container as BaseContainer } from "@ui"

export const Base = styled(BaseContainer).attrs(() => ({
  type: "1",
  styleType: "dark"
}))`
  width: 100%;
  padding: 0;
`

export const Toolbar = styled(BaseContainer).attrs(() => ({
  type: "1",
  styleType: "dark"
}))`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  padding: 15px;
  height: 80px;
  min-height: 60px;
  border-radius: 10px 10px 0 0;
  box-shadow: none;
`

export const EditorContainer = styled.div`
  margin: 20px auto 20px auto;
  border-radius: 10px;
  max-width: 100%;
  color: #ffffff;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
`

export const EditorInner = styled.div`
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  position: relative;

  .ltr {
    text-align: left;
  }

  .rtl {
    text-align: right;
  }

  .editor-input {
    min-height: 150px;
    resize: none;
    font-size: 15px;
    caret-color: #ffffff;
    position: relative;
    tab-size: 1;
    outline: 0;
    padding: 15px 10px;
    background-color: ${({ theme }) => theme.light};
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .editor-text-bold {
    font-weight: bold;
  }

  .editor-text-italic {
    font-style: italic;
  }

  .editor-text-underline {
    text-decoration: underline;
  }

  .editor-text-strikethrough {
    text-decoration: line-through;
  }

  .editor-text-underlineStrikethrough {
    text-decoration: underline line-through;
  }

  .editor-text-code {
    background-color: rgb(206, 208, 212);
    padding: 3px;
    font-family: Menlo, Consolas, Monaco, monospace;
    font-size: 94%;
  }

  .editor-link {
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

  .editor-paragraph {
    margin: 0 0 8px;
    position: relative;
  }

  .editor-paragraph:last-child {
    margin-bottom: 0;
  }

  .editor-heading-h1 {
    font-size: 24px;
    color: #ffffff;
    font-weight: 400;
    margin: 0 0 12px;
    padding: 0;
  }

  .editor-heading-h2 {
    font-size: 15px;
    color: #ffffff;
    font-weight: 700;
    margin: 10px 0 0;
    padding: 0;
    text-transform: uppercase;
  }

  .editor-quote {
    margin: 0 0 0 20px;
    font-size: 15px;
    color: ${tinycolor("#ffffff").darken(20).toHexString()};
    border-left-color: rgb(206, 208, 212);
    border-left-width: 4px;
    border-left-style: solid;
    padding-left: 16px;
  }

  .editor-list-ol {
    padding: 0;
    margin: 0 0 0 16px;
  }

  .editor-list-ul {
    padding: 0;
    margin: 0 0 0 16px;
  }

  .editor-listitem {
    margin: 8px 32px 8px 32px;
  }

  .editor-nested-listitem {
    list-style-type: none;
  }

  .editor-code {
    background-color: rgb(240, 242, 245);
    font-family: Menlo, Consolas, Monaco, monospace;
    display: block;
    padding: 8px 8px 8px 52px;
    line-height: 1.53;
    font-size: 13px;
    margin: 0;
    margin-top: 8px;
    margin-bottom: 8px;
    tab-size: 2;
    white-space: pre;
    overflow-x: auto;
    position: relative;
    color: #000;
  }

  .editor-code:before {
    content: attr(data-gutter);
    position: absolute;
    background-color: #eee;
    left: 0;
    top: 0;
    border-right: 1px solid #ccc;
    padding: 8px;
    color: #777;
    white-space: pre-wrap;
    text-align: right;
    min-width: 25px;
  }
  .editor-code:after {
    content: attr(data-highlight-language);
    top: 2%;
    right: 5px;
    padding: 3px;
    font-size: 10px;
    text-transform: uppercase;
    position: absolute;
    color: rgba(0, 0, 0, 0.5);
  }

  pre::-webkit-scrollbar {
    background: transparent;
    width: 10px;
  }

  pre::-webkit-scrollbar-thumb {
    background: #999;
  }
`

export const EditorPlaceholder = styled.div`
  color: ${tinycolor("#ffffff").darken(25).toHexString()};
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  left: 10px;
  font-size: 15px;
  user-select: none;
  display: inline-block;
  pointer-events: none;
`

export const Divider = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ffffff;
  margin: 0 10px;
`

export const Dropdown = styled(BaseTippy).attrs(() => ({
  theme: "light"
}))<TippyProps>`
  min-width: 200px;
  border-radius: 3px;
`

export const DropdownItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const DropdownItem = styled.div`
  padding: 8px;
  color: #050505;
  cursor: pointer;
  font-size: 15px;
  line-height: 15px;
  display: flex;
  gap: 15px;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  border: 0;
  min-width: 268px;

  &:hover {
    background-color: #eee;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    user-select: none;
    background-size: contain;
  }
`

export const ToolbarButtons = styled.div`
  display: flex;
  gap: 15px;
`

export const Button = styled(ButtonBase)<{ isActive?: boolean }>`
  border: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ theme, isActive }) =>
    isActive
      ? tinycolor(theme["light"]).darken(1).toHexString()
      : theme["dark"]};
  box-shadow: none;

  span {
    display: flex;
    line-height: 20px;
    vertical-align: middle;
    font-size: 14px;
    color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 20px;
    text-align: left;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const LinkEditor = styled.div`
  position: absolute;
  z-index: 5000;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  max-width: 300px;
  width: 100%;
  opacity: 0;
  background-color: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  transition: opacity 0.5s;

  .link-input {
    display: block;
    width: calc(100% - 24px);
    box-sizing: border-box;
    margin: 8px 12px;
    padding: 8px 12px;
    border-radius: 15px;
    background-color: #eee;
    font-size: 15px;
    color: rgb(5, 5, 5);
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;

    a {
      color: rgb(33, 111, 219);
      text-decoration: none;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      margin-right: 30px;
      text-overflow: ellipsis;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  div.link-edit {
    background-image: url("images/icons/pencil-fill.svg");
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    vertical-align: -0.25em;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
  }

  .button {
    width: 20px;
    height: 20px;
    display: inline-block;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    margin: 0 2px;
  }

  .button.hovered {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #eee;
  }

  .button i,
  .actions i {
    background-size: contain;
    display: inline-block;
    height: 20px;
    width: 20px;
    vertical-align: -0.25em;
  }
`

export const Actions = styled.div`
  position: absolute;
  text-align: right;
  padding: 10px;
  bottom: 0;
  right: 0;
  display: flex;
  gap: 5px;
`

export const ActionsButton = styled.button`
  background-color: #eee;
  border: 0;
  position: relative;
  padding: 5px;
  border-radius: 15px;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    background-color: #ddd;
    color: #000;
  }

  &:disabled {
    opacity: 0.6;
    background: #eee;
    cursor: not-allowed;
  }
`
