import { FC } from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { ListItemNode, ListNode } from "@lexical/list"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import {
  TRANSFORMERS,
  $convertToMarkdownString,
  $convertFromMarkdownString
} from "@lexical/markdown"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"

import {
  Base,
  EditorContainer,
  EditorInner,
  EditorPlaceholder
} from "./Editor.styles"
import ExampleTheme from "./themes/ExampleTheme"
import ToolbarPlugin from "./plugins/Toolbar"
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin"
import ActionsPlugin from "./plugins/ActionsPlugin"
import { ImageNode } from "./plugins/ImageNode"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { EditorState } from "lexical"
import UpdatePlugin from "./plugins/UpdatePlugin"

const editorConfig = {
  namespace: "test",
  theme: ExampleTheme,
  onError(error: any) {
    throw error
  },
  nodes: [
    ImageNode,
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    CodeHighlightNode
  ]
}

const Placeholder = () => {
  return (
    <EditorPlaceholder>
      Play around with the Markdown plugin...
    </EditorPlaceholder>
  )
}

interface IEditor {
  onChange?: (value: string) => void
  defaultValue?: string
}

const Editor: FC<IEditor> = ({ onChange, defaultValue }) => {
  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS)

      console.log(markdown)

      onChange && onChange(markdown)
    })
  }

  return (
    <Base>
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editorState: () =>
            $convertFromMarkdownString(defaultValue || "", TRANSFORMERS)
        }}>
        <EditorContainer>
          <ToolbarPlugin />
          <EditorInner>
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  value={defaultValue}
                  className="editor-input"
                />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <CodeHighlightPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={handleChange} />
            <UpdatePlugin updatedValue={defaultValue} />
          </EditorInner>
          <ActionsPlugin />
        </EditorContainer>
      </LexicalComposer>
    </Base>
  )
}

export default Editor
