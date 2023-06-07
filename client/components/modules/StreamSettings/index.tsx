import { FC, useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import * as yup from "yup"

import { useById } from "dto/hooks/Communities"
import { useStart } from "dto/hooks/Stream"
import { generateStreamKey } from "./utils"

import { Modal } from "@ui"

import { PostStartStream } from "dto/types/Streams"
import { StreamSettingsProps } from "./StreamSettings.interface"

import {
  Base,
  Form,
  Input,
  SendButton,
  Textarea,
  Title
} from "./StreamSettings.styles"

const validationSchema = yup.object().shape({
  title: yup.string().required("Введите название стрима!"),
  description: yup.string().required("Введите описание стрима!")
})

const StreamSettings: FC<StreamSettingsProps> = ({
  communityId,
  onClose,
  open,
  onSuccess
}) => {
  const { data: community } = useById(communityId)
  const { mutateAsync: start, status: startStatus } = useStart(communityId)

  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)
  const [streamKey, setStreamKey] = useState<string>("")

  const handleSubmit = async (
    values: Omit<PostStartStream, "key" | "communityId">
  ) => {
    const _data: Omit<PostStartStream, "communityId"> = {
      key: streamKey,
      ...values
    }

    start(_data)
      .then(() => onSuccess())
      .catch((error: { [key: string]: string }) => {
        Object.keys(error).forEach((key) => {
          formMethods?.setError(key, {
            type: "custom",
            message: error[key]
          })
        })
      })
  }

  useEffect(() => {
    const _streamKey = generateStreamKey(community?.name || "")

    setStreamKey(_streamKey)
  }, [community])

  return (
    <Modal open={open} onClose={onClose}>
      <Base>
        <Title>Настройки трансляции</Title>
        <Form
          yupSchema={validationSchema}
          onSubmit={handleSubmit}
          onInit={setFormMethods}>
          <Form.FormField name="title">
            <Input placeholder="Введите название" />
          </Form.FormField>
          <Form.FormField name="description">
            <Textarea placeholder="Введите описание" />
          </Form.FormField>
          <Input
            placeholder="Введите ключ трансляции"
            value={streamKey}
            readOnly
          />
          <SendButton
            type="submit"
            styleType="dark"
            loading={startStatus === "loading"}>
            Запустить трансляцию
          </SendButton>
        </Form>
      </Base>
    </Modal>
  )
}

export default StreamSettings
