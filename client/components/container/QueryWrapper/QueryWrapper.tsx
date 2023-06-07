import { FC } from "react"

import { Loader } from "@ui"

import { QueryWrapperProps } from "./QueryWrapper.interface"

import { Base } from "./QueryWrapper.styles"

const QueryWrapper: FC<QueryWrapperProps> = ({
  status,
  loader = <Loader />,
  children,
  loaderSize
}) => {
  if (status === "loading") {
    return (
      <Base>
        <Loader loader={loader} size={loaderSize} />
      </Base>
    )
  }

  return <>{children}</>
}

export default QueryWrapper
