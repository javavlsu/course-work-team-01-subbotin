import { $createCodeNode, $isCodeNode } from "@lexical/code"
import {
  $convertFromMarkdownString,
  $convertToMarkdownString
} from "@lexical/markdown"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getRoot } from "lexical"
import { FC, useCallback } from "react"
import { DiMarkdown } from "react-icons/di"

import { PLAYGROUND_TRANSFORMERS } from "./MarkdownTransformers"
import { Actions, ActionsButton } from "../Editor.styles"

const ActionsPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()

  const handleMarkdownToggle = useCallback(() => {
    editor.update(() => {
      const root = $getRoot()
      const firstChild = root.getFirstChild()

      if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
        $convertFromMarkdownString(
          firstChild.getTextContent(),
          PLAYGROUND_TRANSFORMERS
        )
      } else {
        const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS)

        root
          .clear()
          .append($createCodeNode("markdown").append($createTextNode(markdown)))
      }

      root.selectEnd()
    })
  }, [editor])

  return (
    <Actions>
      <ActionsButton type="button" onClick={handleMarkdownToggle}>
        <DiMarkdown />
      </ActionsButton>
    </Actions>
  )
}

export default ActionsPlugin
