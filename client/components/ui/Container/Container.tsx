import { FC } from "react"
import classes from "classnames"

import { ContainerProps } from "./Container.interface"

import { Base } from "./Container.styles"

const Container: FC<ContainerProps> = ({
  children,
  type = "1",
  styleType = "light",
  className,
  onClick,
  ref
}) => {
  return (
    <Base
      ref={ref}
      type={type}
      styleType={styleType}
      onClick={onClick}
      className={classes(className, {
        [`${className}-${styleType}`]: !!className
      })}>
      {children}
    </Base>
  )
}

export default Container
