import { FC, useCallback, useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { MdUpload } from "react-icons/md"
import { useRouter } from "next/router"
import * as yup from "yup"

import { toBase64 } from "@utils/helpers"

import { useCreate, useUpdate, useById } from "@dto/hooks/Posts"

import { Button, Modal, Upload, UploadFileProps, Editor } from "@ui"

import { PostPost } from "dto/types/Posts"
import { CreatePostProps } from "./PostSettings.interface"
import { File } from "@dto/types/Files"

import { Base, Form, Input, Title } from "./PostSettings.styles"

const validationSchema = yup.object().shape({
  title: yup.string().required("Введите заголовок!"),
  content: yup.string().required("Введите содержание!")
})

const CreatePost: FC<CreatePostProps> = ({ open, onClose, isModal }) => {
  const router = useRouter()
  const { post: postId } = router.query

  const { data: postData } = useById()

  const { mutateAsync: create, status: createStatus } = useCreate()
  const { mutateAsync: update, status: updateStatus } = useUpdate()

  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)
  const [contentMarkdown, setContentMarkdown] = useState<string>("")

  const handleClose = () => {
    formMethods?.reset()
    onClose()
  }

  const handleSubmit = async (
    values: Omit<PostPost, "files"> & { files?: UploadFileProps[] }
  ) => {
    let _files: string[] = []

    if (values.files) {
      _files = await Promise.all(
        values.files?.map(async (item) => await toBase64(item.originalFile))
      )
    }

    const _data: PostPost = {
      title: values.title,
      content: values.content,
      files: _files
    }

    postId
      ? update(_data)
          .then(() => handleClose())
          .catch((error: { [key: string]: string }) => {
            Object.keys(error).forEach((key) => {
              formMethods?.setError(key, {
                type: "custom",
                message: error[key]
              })
            })
          })
      : create(_data)
          .then(() => handleClose())
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
    if (postData && !!formMethods) {
      formMethods.setValue("id", postData.id)
      formMethods.setValue("title", postData.title)
      formMethods.setValue("content", postData.content)
      formMethods.setValue("files", [])

      setContentMarkdown(postData.content)
    }
  }, [formMethods, postData])

  useEffect(() => {
    if (formMethods) {
      formMethods?.setValue("content", contentMarkdown)
    }
  }, [contentMarkdown, formMethods])

  const renderForm = useCallback(() => {
    return (
      <Base>
        <Title>
          {Number(!!postId) ? "Редактирование поста" : "Создание поста"}
        </Title>
        <Form
          yupSchema={validationSchema}
          onSubmit={handleSubmit}
          onInit={setFormMethods}>
          <Form.FormField name="title">
            <Input placeholder="Введите заголовок" />
          </Form.FormField>
          <Form.FormField name="content">
            <Editor defaultValue={contentMarkdown} />
          </Form.FormField>
          <Form.FormField name="files">
            <Upload
              styleType="dark"
              button={
                <Button styleType="dark">
                  <MdUpload />
                  Прикрепить файлы
                </Button>
              }
              withPreviews
            />
          </Form.FormField>
          <Button
            type="submit"
            styleType="dark"
            loading={createStatus === "loading" || updateStatus === "loading"}>
            {Number(!!postId) ? "Обновить" : "Создать"}
          </Button>
        </Form>
      </Base>
    )
  }, [contentMarkdown, createStatus, handleSubmit, postId, updateStatus])

  return isModal ? (
    <Modal open={open} onClose={handleClose}>
      {renderForm()}
    </Modal>
  ) : (
    renderForm()
  )
}

export default CreatePost
