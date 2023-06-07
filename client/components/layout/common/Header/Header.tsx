import { FC, useState } from "react"

import { useUser } from "dto/hooks/User"

import { Avatar, Modal } from "@ui"
import Authentication from "components/modules/Authentication"
import UserSettings from "components/modules/UserSettings"
import { MdSettings } from "react-icons/md"

import { Container, Content, LoginButton, Menu } from "./Header.styles"
import Link from "next/link"

const Header: FC = () => {
  const { data } = useUser()

  const [isOpenUserSettings, setIsOpenUserSettings] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)

  const modalReducer = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }

  const userSettingsReducer = {
    open: () => setIsOpenUserSettings(true),
    close: () => setIsOpenUserSettings(false)
  }

  return (
    <>
      <Container>
        <Content>
          <Menu>
            <Link href="/">Главная</Link>
            <Link href="/communities">Все сообщества</Link>
          </Menu>
          {!data ? (
            <LoginButton onClick={modalReducer.open}>
              Войти / Зарегестрироваться
            </LoginButton>
          ) : (
            <Avatar
              img={data?.avatar || ""}
              alt={data?.username}
              onClick={userSettingsReducer.open}
              overflowContent={<MdSettings />}
              size="small"
              styleType="dark"
            />
          )}
        </Content>
      </Container>
      <Modal open={isOpen} onClose={modalReducer.close}>
        <Authentication />
      </Modal>
      <UserSettings
        open={isOpenUserSettings}
        onClose={userSettingsReducer.close}
        userId={data?.id || ""}
      />
    </>
  )
}

export default Header
