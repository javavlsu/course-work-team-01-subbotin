import { ChangeEvent, FC, useState, forwardRef, useEffect } from "react"

import { MdError, MdCheckCircle } from "react-icons/md"

import { InputProps, InputValidation } from "./Input.interface"

import {
  Base,
  FieldBase,
  Field,
  FieldValidation,
  Description
} from "./Input.styles"

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      prefix,
      type,
      value,
      onChange,
      disable,
      placeholder,
      className,
      styleType = "light",
      validation,
      autoComplete,
      readOnly
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<string>(value || "")
    const [currentValidation, setCurrentValidation] = useState<
      InputValidation | undefined
    >(validation)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!disable) {
        setCurrentValue(e.target.value)
        onChange && onChange(e.target.value)
      }
    }

    useEffect(() => {
      setCurrentValidation(validation || undefined)
    }, [setCurrentValidation, validation])

    useEffect(() => {
      setCurrentValue(value || "")
    }, [value])

    return (
      <Base className={className}>
        <FieldBase styleType={styleType}>
          {!!prefix && prefix}
          <Field
            ref={ref}
            name={name}
            type={type}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            disabled={disable}
            autoComplete={!autoComplete ? "off" : ""}
            readOnly={readOnly}
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

Input.displayName = "Input"

export default Input
