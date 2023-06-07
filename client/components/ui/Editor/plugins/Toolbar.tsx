import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  FC,
  RefObject,
  ReactNode
} from "react"
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  LexicalEditor,
  RangeSelection,
  NodeSelection,
  GridSelection
} from "lexical"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode
} from "@lexical/list"
import { createPortal } from "react-dom"
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode
} from "@lexical/rich-text"
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  AlignJustify,
  ListOrdered,
  List,
  Link2,
  Underline,
  Strikethrough,
  Bold,
  Italic,
  Code,
  Quote,
  ChevronDown,
  Edit
} from "lucide-react"

import {
  Button,
  Dropdown,
  LinkEditor,
  Divider,
  ToolbarButtons,
  Toolbar,
  DropdownItems,
  DropdownItem
} from "../Editor.styles"

const LowPriority = 1

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "h1",
  "h2",
  "ul",
  "ol"
])

const blockTypeToBlockName = {
  h1: "Заголовок 1",
  h2: "Заголовок 2",
  h3: "Заголовок 3",
  h4: "Заголовок 4",
  h5: "Заголовок 5",
  h6: "Заголовок 6",
  ol: "Нумерованный список",
  paragraph: "Нормальный",
  quote: "Описание",
  ul: "Список"
}

const blockTypeIcons = {
  code: <Code />,
  h1: <Heading1 />,
  h2: <Heading2 />,
  h3: <Heading3 />,
  h4: <Heading4 />,
  h5: <Heading5 />,
  h6: <Heading6 />,
  ol: <ListOrdered />,
  paragraph: <AlignJustify />,
  quote: <Quote />,
  ul: <List />,
  link: <Link2 />,
  bold: <Bold />,
  italic: <Italic />,
  underline: <Underline />,
  strikethrough: <Strikethrough />
}

function positionEditorElement(editor: HTMLDivElement, rect: any) {
  if (rect === null) {
    editor.style.opacity = "0"
    editor.style.top = "-1000px"
    editor.style.left = "-1000px"
  } else {
    const _left =
      rect.left + window.screenLeft - editor.offsetWidth / 2 + rect.width / 2

    editor.style.opacity = "1"
    editor.style.top = `${rect.top + rect.height + window.screenTop + 10}px`
    editor.style.left =
      _left + editor.offsetWidth < window.innerWidth
        ? `${_left < editor.offsetWidth ? "10" : _left}px`
        : "auto"
    editor.style.right =
      _left + editor.offsetWidth >= window.innerWidth ? "10px" : "auto"
  }
}

function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  }
}

interface IBlockOptionsDropdownList {
  editor: LexicalEditor
  blockType: string
  toolbarRef: RefObject<HTMLDivElement>
  setShowBlockOptionsDropDown: (value: boolean) => void
  children: ReactNode
}

const BlockOptionsDropdownList: FC<IBlockOptionsDropdownList> = ({
  editor,
  blockType,
  setShowBlockOptionsDropDown,
  children
}) => {
  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  return (
    <Dropdown
      trigger="click"
      content={
        <DropdownItems>
          <DropdownItem onClick={formatParagraph}>
            {blockTypeIcons.paragraph}
            {blockTypeToBlockName.paragraph}
          </DropdownItem>
          <DropdownItem onClick={formatLargeHeading}>
            {blockTypeIcons.h1}
            {blockTypeToBlockName.h1}
          </DropdownItem>
          <DropdownItem onClick={formatSmallHeading}>
            {blockTypeIcons.h2}
            {blockTypeToBlockName.h2}
          </DropdownItem>
          <DropdownItem onClick={formatBulletList}>
            {blockTypeIcons.ul}
            {blockTypeToBlockName.ul}
          </DropdownItem>
          <DropdownItem onClick={formatNumberedList}>
            {blockTypeIcons.ol}
            {blockTypeToBlockName.ol}
          </DropdownItem>
          <DropdownItem onClick={formatQuote}>
            {blockTypeIcons.quote}
            {blockTypeToBlockName.quote}
          </DropdownItem>
        </DropdownItems>
      }
      allowHTML
      interactive
      arrow>
      <span>{children}</span>
    </Dropdown>
  )
}

interface IFloatingLinkEditor {
  editor: LexicalEditor
}

const FloatingLinkEditor: FC<IFloatingLinkEditor> = ({ editor }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mouseDownRef = useRef<any>(false)

  const [linkUrl, setLinkUrl] = useState<string>("")
  const [isEditMode, setEditMode] = useState<boolean>(false)
  const [lastSelection, setLastSelection] = useState<
    RangeSelection | NodeSelection | GridSelection | null
  >(null)

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()

      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
      } else {
        setLinkUrl("")
      }
    }

    const editorElem = editorRef.current
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (editorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()

    if (
      selection !== null &&
      !!nativeSelection &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0)
      let rect

      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild as HTMLElement
        }
        rect = inner.getBoundingClientRect()
      } else {
        rect = domRange.getBoundingClientRect()
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect)
      }

      setLastSelection(selection)
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElem, null)
      setLastSelection(null)
      setEditMode(false)
      setLinkUrl("")
    }

    return true
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor()
          return true
        },
        LowPriority
      )
    )
  }, [editor, updateLinkEditor])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  return (
    <LinkEditor ref={editorRef}>
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
                }
                setEditMode(false)
              }
            } else if (event.key === "Escape") {
              event.preventDefault()
              setEditMode(false)
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <Edit
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.preventDefault()
                setEditMode(true)
              }}
            />
          </div>
        </>
      )}
    </LinkEditor>
  )
}

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [blockType, setBlockType] = useState<string>("paragraph")
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false)
  const [isLink, setIsLink] = useState<boolean>(false)
  const [isBold, setIsBold] = useState<boolean>(false)
  const [isItalic, setIsItalic] = useState<boolean>(false)
  const [isUnderline, setIsUnderline] = useState<boolean>(false)
  const [isStrikethrough, setIsStrikethrough] = useState<boolean>(false)
  const [isCode, setIsCode] = useState<boolean>(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)
          const type = parentList ? parentList.getTag() : element.getTag()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          setBlockType(type)
        }
      }

      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsCode(selection.hasFormat("code"))

      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar()
          return false
        },
        LowPriority
      )
    )
  }, [editor, updateToolbar])

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://")
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  return (
    <Toolbar ref={toolbarRef}>
      {supportedBlockTypes.has(blockType) && (
        <>
          <BlockOptionsDropdownList
            editor={editor}
            blockType={blockType}
            toolbarRef={toolbarRef}
            setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}>
            <Button
              onClick={() =>
                setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
              }>
              {blockTypeIcons[blockType as keyof typeof blockTypeToBlockName]}
              <span>
                {
                  blockTypeToBlockName[
                    blockType as keyof typeof blockTypeToBlockName
                  ]
                }
              </span>
              <ChevronDown />
            </Button>
          </BlockOptionsDropdownList>
          <Divider />
        </>
      )}
      <>
        <ToolbarButtons>
          <Button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }}
            isActive={isBold}>
            {blockTypeIcons.bold}
          </Button>
          <Button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }}
            isActive={isItalic}>
            {blockTypeIcons.italic}
          </Button>
          <Button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }}
            isActive={isUnderline}>
            {blockTypeIcons.underline}
          </Button>
          <Button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
            }}
            isActive={isStrikethrough}>
            {blockTypeIcons.strikethrough}
          </Button>
          <Button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
            }}
            isActive={isCode}>
            {blockTypeIcons.code}
          </Button>
          <Button onClick={insertLink} isActive={isLink}>
            {blockTypeIcons.link}
          </Button>
        </ToolbarButtons>
        {isLink &&
          createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
      </>
    </Toolbar>
  )
}

export default ToolbarPlugin
