import { FC, useState } from "react"
import * as yup from "yup"
import { UseFormReturn } from "react-hook-form"
import { MdSend, MdUpload } from "react-icons/md"

import { toBase64 } from "utils/helpers"

import { useRegistration } from "dto/hooks/Authentication"

import { Avatar, Form, Upload, UploadFileProps } from "@ui"

import { RegistrationData } from "dto/types/Authentication"

import {
  Controls,
  Fields,
  Input,
  Question,
  SendButton,
  Title
} from "../Authentication.styles"

const validationSchema = yup.object().shape({
  username: yup.string().required("Введите логин!"),
  password: yup.string().required("Введите пароль!")
})

const Authorization: FC<{
  changeForm: (type: "authorization" | "registration") => void
}> = ({ changeForm }) => {
  const { mutateAsync: registration, status: registrationStatus } =
    useRegistration()

  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)
  const [avatarImage, setAvatarImage] = useState<string>("")

  const onSubmit = async (
    values: Omit<RegistrationData, "avatar"> & { avatar?: UploadFileProps[] }
  ) => {
    const _data: RegistrationData = {
      ...values,
      avatar: values.avatar ? await toBase64(values.avatar[0].originalFile) : "",
    }

    registration(_data).catch((error: { [key: string]: string }) => {
      Object.keys(error).forEach((key) => {
        formMethods?.setError(key, { type: "custom", message: error[key] })
      })
    })
  }

  return (
    <>
      <Title>Регистрация</Title>
      <Form
        yupSchema={validationSchema}
        onSubmit={onSubmit}
        onInit={setFormMethods}>
        <Fields>
          <Form.FormField name="avatar">
            <Upload
              onChange={(files) => setAvatarImage(files[0].thumbUrl)}
              styleType="dark"
              button={
                <Avatar
                  img={avatarImage}
                  alt="Аватарка пользователя"
                  styleType="dark"
                  noImageContent={<MdUpload fontSize={42} />}
                  overflowContent={<MdUpload fontSize={42} />}
                  loading={registrationStatus === "loading"}
                />
              }
            />
          </Form.FormField>
          <Form.FormField name="username">
            <Input placeholder="Логин" autoComplete={false} />
          </Form.FormField>
          <Form.FormField name="email">
            <Input placeholder="Почта" autoComplete={false} />
          </Form.FormField>
          <Form.FormField name="password">
            <Input type="password" placeholder="Пароль" autoComplete={false} />
          </Form.FormField>
        </Fields>
        <Controls>
          <SendButton
            type="submit"
            styleType="dark"
            loading={registrationStatus === "loading"}>
            Зарегестрироваться
            <MdSend />
          </SendButton>
          <Question>
            У вас уже есть аккаунт?
            <span onClick={() => changeForm("authorization")}>
              Войти в аккаунт
            </span>
          </Question>
        </Controls>
      </Form>
    </>
  )
}

export default Authorization
