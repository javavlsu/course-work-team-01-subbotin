import { FC } from "react"

import { LoaderProps } from "./Loader.interface"

import { Base, DefaultLoader } from "./Loader.styles"

const Loader: FC<LoaderProps> = ({
  loader = <DefaultLoader />,
  size = "4em"
}) => {
  return <Base size={size}>{loader}</Base>
}

export default Loader
