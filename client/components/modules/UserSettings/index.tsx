import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import * as yup from "yup"
import { UseFormReturn } from "react-hook-form"
import { MdDelete, MdLogout, MdUpload } from "react-icons/md"


import { toBase64 } from "utils/helpers"

import { useDelete, useUpdate, useUser } from "dto/hooks/User"

import { Modal, Upload, UploadFileProps } from "@ui"
import { QueryWrapper } from "@container"

import { Settings } from "dto/types/User"
import { InitialValues, UserSettingsProps } from "./UserSettings.interface"

import {
  Avatar,
  Base,
  Controls,
  DeleteButton,
  Form,
  Input,
  LogoutButton,
  SendButton,
  Title
} from "./UserSettings.styles"

const UserSettings: FC<UserSettingsProps> = ({ open, onClose }) => {
  const router = useRouter()

  const { data: settings, status: settingsStatus } = useUser()
  const { mutateAsync: updateUser, status: updateStatus } = useUpdate()
  const { mutateAsync: deleteUser, status: deleteStatus } = useDelete()

  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)
  const [avatarImage, setAvatarImage] = useState<string>("")

  const validationSchema = yup.object().shape({
    avatar: yup.mixed().test("required", "Загрузите аватарку!", (value?: UploadFileProps[] | string) => {
      return !Array.isArray(value) ? true : value?.length === 1
    }),
    username: yup.string().required("Введите логин!"),
    email: yup
    .string()
    .email("Введите корректный e-mail")
    .required("Введите e-mail")
  })

  const handleSubmit = async (
    values: Omit<Settings, "avatar"> & { avatar: UploadFileProps[] | string }
  ) => {
    const _data: Settings = {
      ...values,
      avatar: typeof values.avatar !== "string" ? await toBase64(values.avatar[0].originalFile) : values.avatar
    }

    updateUser(_data)
      .then(() => {
        router.reload()
      })
      .catch((error: { [key: string]: string }) => {
        Object.keys(error).forEach((key) => {
          formMethods?.setError(key, { type: "custom", message: error[key] })
        })
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem("token")
    router.reload()
  }

  const handleDelete = () =>
    deleteStatus !== "loading" && deleteUser()

  useEffect(() => {
    if (settings) {
      setAvatarImage(settings.avatar || "")
    }
  }, [settings])

  return (
    <Modal open={open} onClose={onClose}>
      <Base>
        <Title>Настройки аккаунта</Title>
        <QueryWrapper status={settingsStatus}>
          <Form
            defaultValues={settings || {}}
            yupSchema={validationSchema}
            onSubmit={handleSubmit}
            onInit={setFormMethods}>
            <Form.FormField name="avatar">
              <Upload
                onChange={(files) => setAvatarImage(files[0].thumbUrl)}
                styleType="dark"
                button={
                  <Avatar
                    img={avatarImage}
                    alt="Аватарка"
                    styleType="dark"
                    noImageContent={<MdUpload fontSize={42} />}
                    overflowContent={<MdUpload fontSize={42} />}
                  />
                }
              />
            </Form.FormField>
            <Form.FormField name="username">
              <Input type="text" placeholder="Введите ваш логин" />
            </Form.FormField>
            <Form.FormField name="email">
              <Input type="email" placeholder="Введите вашу почту" />
            </Form.FormField>
            <Controls>
              <SendButton
                type="submit"
                styleType="dark"
                loading={
                  updateStatus === "loading"
                }>
                Обновить
              </SendButton>
              <LogoutButton onClick={handleLogout}>
                <MdLogout />
              </LogoutButton>
              <DeleteButton onClick={handleDelete}>
                <QueryWrapper status={deleteStatus} loaderSize="1em">
                  <MdDelete />
                </QueryWrapper>
              </DeleteButton>
            </Controls>
          </Form>
        </QueryWrapper>
      </Base>
    </Modal>
  )
}

export default UserSettings
