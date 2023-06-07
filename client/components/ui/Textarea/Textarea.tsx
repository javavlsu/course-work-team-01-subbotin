import { ChangeEvent, FC, useState, forwardRef, useEffect, useRef } from "react"

import { MdError, MdCheckCircle } from "react-icons/md"

import { TextareaProps, TextareaValidation } from "./Textarea.interface"
import {
  Base,
  Description,
  Field,
  FieldBase,
  FieldValidation
} from "./Textarea.styles"

const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(
  (
    {
      name,
      className,
      styleType,
      onChange,
      disable,
      placeholder,
      value,
      validation
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<string>(value || "")
    const [currentValidation, setCurrentValidation] = useState<
      TextareaValidation | undefined
    >(validation)

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const handleUpdateHeight = () => {
      const node = textareaRef.current

      if (node) {
        node.style.height = "inherit"
        node.style.height = `${node.scrollHeight}px`
      }
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!disable) {
        setCurrentValue(e.target.value)
        onChange && onChange(e.target.value)
      }
    }

    useEffect(() => {
      setCurrentValidation(validation || undefined)
    }, [setCurrentValidation, validation])

    useEffect(() => {
      handleUpdateHeight()
      setCurrentValue(value || "")
    }, [value])

    return (
      <Base className={className}>
        <FieldBase styleType={styleType}>
          <Field
            ref={(node) => {
              if (node) {
                textareaRef.current = node

                if (typeof ref === "function") {
                  ref(node)
                } else if (ref) {
                  ref.current = node
                }
              }
            }}
            name={name}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            disabled={disable}
          />
          {!!currentValidation?.type && (
            <FieldValidation type={currentValidation?.type}>
              {currentValidation?.type === "error" ? (
                <MdError />
              ) : (
                <MdCheckCircle />
              )}
            </FieldValidation>
          )}
        </FieldBase>
        {currentValidation?.message && (
          <Description type={currentValidation?.type}>
            {currentValidation.message}
          </Description>
        )}
      </Base>
    )
  }
)

Textarea.displayName = "Textarea"

export default Textarea
