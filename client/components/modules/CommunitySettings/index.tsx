import { FC, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { UseFormReturn } from "react-hook-form"
import * as yup from "yup"
import { MdDelete, MdUpload } from "react-icons/md"

import { toBase64 } from "@utils/helpers"

import { useById, useCreate, useDelete, useUpdate } from "dto/hooks/Communities"

import { Modal, Tag, Upload, UploadFileProps } from "@ui"
import { QueryWrapper } from "@container"

import { PostCommunity } from "dto/types/Communities"
import { CreateCommunityProps } from "./CommunitySettings.interface"

import {
  Avatar,
  Banner,
  BannerImage,
  Base,
  Controls,
  DeleteButton,
  Form,
  Input,
  Keywords,
  KeywordsField,
  KeywordsFieldAdd,
  SendButton,
  Textarea,
  Title
} from "./CommunitySettings.styles"
import { Description as InputError } from "components/ui/Input/Input.styles"

const CreateCommunity: FC<CreateCommunityProps> = ({
  open,
  onClose,
  communityId,
  onSuccess,
  onDelete
}) => {
  const { data: community, status: communityStatus } = useById()
  const { mutateAsync: createCommunity, status: createStatus } = useCreate()
  const { mutateAsync: updateCommunity, status: updateStatus } = useUpdate()
  const { mutateAsync: deleteCommunity, status: deleteStatus } = useDelete()

  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)
  const [avatarImage, setAvatarImage] = useState<string>("")
  const [bannerImage, setBannerImage] = useState<string>("")
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordValue, setKeywordValue] = useState<string>("")
  const [keywordsError, setKeywordsError] = useState<string>("")

  const validationSchema = yup.object().shape({
    avatar: yup
      .mixed()
      .test(
        "required",
        "Загрузите аватарку!",
        (value?: UploadFileProps[] | string) => {
          return !Array.isArray(value) && !!value ? true : value?.length === 1
        }
      ),
    banner: yup
      .mixed()
      .test(
        "required",
        "Загрузите баннер!",
        (value?: UploadFileProps[] | string) => {
          return !Array.isArray(value) && !!value ? true : value?.length === 1
        }
      ),
    name: yup.string().required("Введите имя!"),
    description: yup.string().required("Введите описание!"),
    keywords: yup.array().min(1, "Введите хотя бы одно ключевое слово!")
  })

  const handleClose = () => {
    onClose()
    setKeywords([])
    setKeywordValue("")
    formMethods?.reset()
  }

  const handleSubmit = async (
    values: Omit<PostCommunity, "keywords" | "avatar" | "banner"> & {
      avatar: UploadFileProps[] | string
      banner: UploadFileProps[] | string
    }
  ) => {
    !communityId && delete values.id

    const _data: PostCommunity = {
      ...values,
      avatar:
        typeof values.avatar !== "string"
          ? await toBase64(values.avatar[0].originalFile)
          : values.avatar,
      banner:
        typeof values.banner !== "string"
          ? await toBase64(values.banner[0].originalFile)
          : values.banner,
      keywords: keywords
    }

    communityId
      ? updateCommunity(_data)
          .then((community) => {
            onSuccess && onSuccess(community)
            handleClose()
          })
          .catch((error: { [key: string]: string }) => {
            Object.keys(error).forEach((key) => {
              formMethods?.setError(key, {
                type: "custom",
                message: error[key]
              })
            })
          })
      : createCommunity(_data)
          .then((community) => {
            onSuccess && onSuccess(community)
            handleClose()
          })
          .catch((error: { [key: string]: string }) => {
            Object.keys(error).forEach((key) => {
              formMethods?.setError(key, {
                type: "custom",
                message: error[key]
              })
            })
          })
  }

  const handleDelete = () =>
    deleteStatus !== "loading" &&
    deleteCommunity().then(() => onDelete && onDelete(communityId as number))

  const handleChangeKeyword = (value: string) => {
    setKeywordValue(value)
  }

  const handleAddKeyword = () => {
    if (keywordValue) {
      setKeywords([...keywords, keywordValue])
      setKeywordValue("")
    }
  }

  useEffect(() => {
    if (communityId && community) {
      setAvatarImage(community.avatar || "")
      setBannerImage(community.banner || "")
      setKeywords(community.keywords)
    }
  }, [community, communityId])

  useEffect(() => {
    formMethods?.formState.errors.keywords &&
      setKeywordsError(
        formMethods?.formState?.errors?.keywords?.message as string
      )
  }, [formMethods?.formState.errors])

  return (
    <Modal open={open} onClose={handleClose}>
      <Base>
        <Title>
          {communityId ? "Редактирование сообщества" : "Создание сообщества"}
        </Title>
        <QueryWrapper status={communityId ? communityStatus : "success"}>
          <Form
            defaultValues={community || {}}
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
                    alt="Аватарка сообщества"
                    styleType="dark"
                    noImageContent={<MdUpload fontSize={42} />}
                    overflowContent={<MdUpload fontSize={42} />}
                  />
                }
              />
            </Form.FormField>
            <Form.FormField name="banner">
              <Upload
                onChange={(files) => setBannerImage(files[0].thumbUrl)}
                styleType="dark"
                button={
                  <Banner>
                    {bannerImage ? (
                      <BannerImage src={bannerImage} alt="Баннер сообщества" />
                    ) : (
                      <>
                        <MdUpload fontSize={42} />
                      </>
                    )}
                    <span>
                      <MdUpload fontSize={42} />
                    </span>
                  </Banner>
                }
              />
            </Form.FormField>
            <Form.FormField name="name">
              <Input placeholder="Введите название" />
            </Form.FormField>
            <Form.FormField name="description">
              <Textarea placeholder="Введите описание" />
            </Form.FormField>
            <>
              <KeywordsField>
                <Input
                  placeholder="Введите ключевое слово"
                  value={keywordValue}
                  onChange={handleChangeKeyword}
                />
                <KeywordsFieldAdd onClick={handleAddKeyword}>
                  +
                </KeywordsFieldAdd>
              </KeywordsField>
              <Keywords>
                {keywords.map((item) => (
                  <Tag key={uuid()} styleType="dark">
                    {item}
                  </Tag>
                ))}
              </Keywords>
              {keywordsError && (
                <InputError type="error">{keywordsError}</InputError>
              )}
            </>
            <Controls>
              <SendButton
                type="submit"
                styleType="dark"
                loading={
                  createStatus === "loading" || updateStatus === "loading"
                }>
                {communityId ? "Обновить" : "Создать"}
              </SendButton>
              {!!communityId && (
                <DeleteButton onClick={handleDelete}>
                  <QueryWrapper status={deleteStatus} loaderSize="1em">
                    <MdDelete />
                  </QueryWrapper>
                </DeleteButton>
              )}
            </Controls>
          </Form>
        </QueryWrapper>
      </Base>
    </Modal>
  )
}

export default CreateCommunity
