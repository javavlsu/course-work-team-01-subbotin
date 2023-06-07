import { FC, useState } from "react"
import * as yup from "yup"
import { UseFormReturn } from "react-hook-form"

import { useLogin } from "dto/hooks/Authentication"

import { Form } from "@ui"
import { MdSend } from "react-icons/md"

import { AuthorizationData } from "dto/types/Authentication"

import {
  Fields,
  Title,
  Input,
  Controls,
  Question,
  SendButton
} from "../Authentication.styles"

const validationSchema = yup.object().shape({
  username: yup.string().required("Введите логин!"),
  password: yup.string().required("Введите пароль!")
})

const Authorization: FC<{
  changeForm: (type: "authorization" | "registration") => void
}> = ({ changeForm }) => {
  const { mutateAsync: login, status: loginStatus } = useLogin()

  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)

  const onSubmit = (data: AuthorizationData) =>
    login(data).catch((error: { [key: string]: string }) => {
      Object.keys(error).forEach((key) => {
        formMethods?.setError(key, { type: "custom", message: error[key] })
      })
    })

  return (
    <>
      <Title>Авторизация</Title>
      <Form
        yupSchema={validationSchema}
        onSubmit={onSubmit}
        onInit={setFormMethods}>
        <Fields>
          <Form.FormField name="username">
            <Input placeholder="Логин" autoComplete={false} />
          </Form.FormField>
          <Form.FormField name="password">
            <Input type="password" placeholder="Пароль" autoComplete={false} />
          </Form.FormField>
        </Fields>
        <Controls>
          <SendButton
            type="submit"
            styleType="dark"
            loading={loginStatus === "loading"}>
            Отправить
            <MdSend />
          </SendButton>
          <Question>
            У вас нет аккаунта?
            <span onClick={() => changeForm("registration")}>
              Зарегестрироваться
            </span>
          </Question>
        </Controls>
      </Form>
    </>
  )
}

export default Authorization
