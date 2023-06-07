import { FC } from "react"

import { ButtonProps } from "./Button.interface"

import { Base, ButtonLoader } from "./Button.styles"

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  styleType = "light",
  onClick,
  disabled = false,
  className,
  loading,
  loader = <ButtonLoader />
}) => {
  return (
    <Base
      onClick={onClick}
      styleType={styleType}
      type={type}
      disabled={disabled}
      className={className}>
      {!loading ? children : loader}
    </Base>
  )
}

export default Button
