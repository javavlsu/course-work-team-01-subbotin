import { FC } from "react"

import { useUser } from "dto/hooks/User"

import { QueryWrapper } from "@container"
import { Header } from "./common"

import { LayoutProps } from "./Layout.interface"

import { Container, Main } from "./Layout.styles"

const Layout: FC<LayoutProps> = ({ children }) => {
  const { status } = useUser()

  return (
    <QueryWrapper status={status}>
      <Container>
        <Header />
        <Main>{children}</Main>
      </Container>
    </QueryWrapper>
  )
}

export default Layout
