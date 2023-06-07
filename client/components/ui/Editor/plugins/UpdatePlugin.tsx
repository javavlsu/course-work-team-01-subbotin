import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TRANSFORMERS, $convertFromMarkdownString } from "@lexical/markdown"
import { FC, useEffect } from "react"

const UpdatePlugin: FC<{ updatedValue?: string }> = ({ updatedValue }) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    console.log(updatedValue)
    editor.update(() => {
      if (updatedValue) {
        editor.update(() => {
          $convertFromMarkdownString(updatedValue, TRANSFORMERS)
        })
      }
    })
  }, [editor, updatedValue])

  return <></>
}

export default UpdatePlugin
