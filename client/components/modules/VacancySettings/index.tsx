import { FC, useCallback, useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { useRouter } from "next/router"
import * as yup from "yup"

import {
  useGetVacancyById,
  useCreateVacancy,
  useUpdateVacancy
} from "@dto/hooks/Vacancy"

import { Button, Modal, Tag } from "@ui"

import { PostVacancy } from "dto/types/Vacancies"
import { VacancySettingsProps } from "./VacancySettings.interface"

import {
  Base,
  Form,
  Input,
  Keywords,
  KeywordsField,
  KeywordsFieldAdd,
  Textarea,
  Title,
  SalaryBlock
} from "./VacancySettings.styles"
import { Description as InputError } from "components/ui/Input/Input.styles"
import { v4 as uuid } from "uuid"

const validationSchema = yup.object().shape({
  title: yup.string().required("Введите заголовок!"),
  content: yup.string().required("Введите содержание!"),
  minSalary: yup.string().required("Введите минимальную зарплату!"),
  currency: yup.string().required("Введите валюту!")
})

const VacancySettings: FC<VacancySettingsProps> = ({
  open,
  onClose,
  isModal
}) => {
  const router = useRouter()
  const { vacancy: vacancyId } = router.query

  const { data: vacancyData } = useGetVacancyById()

  const { mutateAsync: create, status: createStatus } = useCreateVacancy()
  const { mutateAsync: update, status: updateStatus } = useUpdateVacancy()

  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordValue, setKeywordValue] = useState<string>("")
  const [keywordsError, setKeywordsError] = useState<string>("")
  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)

  const handleClose = () => {
    formMethods?.reset()
    onClose()
  }

  const handleSubmit = async (values: PostVacancy) => {
    const _data: PostVacancy = {
      ...values,
      keywords
    }

    !Number(vacancyId)
      ? create(_data)
          .then(() => handleClose())
          .catch((error: { [key: string]: string }) => {
            Object.keys(error).forEach((key) => {
              formMethods?.setError(key, {
                type: "custom",
                message: error[key]
              })
            })
          })
      : update(_data)
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

  const handleChangeKeyword = (value: string) => {
    setKeywordValue(value)
  }

  const handleAddKeyword = () => {
    if (keywordValue) {
      setKeywords([...keywords, keywordValue])
      setKeywordValue("")
    }
  }

  const renderForm = useCallback(() => {
    return (
      <Base>
        <Title>
          {Number(!!vacancyId)
            ? "Редактирование вакансии"
            : "Создание вакансии"}
        </Title>
        <Form
          yupSchema={validationSchema}
          onSubmit={handleSubmit}
          onInit={setFormMethods}>
          <Form.FormField name="title">
            <Input placeholder="Введите заголовок" />
          </Form.FormField>
          <Form.FormField name="content">
            <Textarea placeholder="Введите контент" />
          </Form.FormField>
          <>
            <KeywordsField>
              <Input
                placeholder="Введите ключевое слово"
                value={keywordValue}
                onChange={handleChangeKeyword}
              />
              <KeywordsFieldAdd onClick={handleAddKeyword}>+</KeywordsFieldAdd>
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
          <SalaryBlock>
            <Form.FormField name="minSalary">
              <Input placeholder="Введите минимальную зарплату" />
            </Form.FormField>
            <Form.FormField name="maxSalary">
              <Input placeholder="Введите максимальную зарплату" />
            </Form.FormField>
            <Form.FormField name="currency">
              <Input placeholder="Введите валюту" />
            </Form.FormField>
          </SalaryBlock>
          <Button
            type="submit"
            styleType="dark"
            loading={createStatus === "loading" || updateStatus === "loading"}>
            {Number(!!vacancyId) ? "Обновить" : "Создать"}
          </Button>
        </Form>
      </Base>
    )
  }, [
    createStatus,
    handleAddKeyword,
    handleSubmit,
    keywordValue,
    keywords,
    keywordsError,
    updateStatus,
    vacancyId
  ])

  useEffect(() => {
    if (vacancyData) {
      formMethods?.setValue("id", vacancyData.id)
      formMethods?.setValue("title", vacancyData.title)
      formMethods?.setValue("content", vacancyData.content)
      formMethods?.setValue("minSalary", vacancyData.minSalary)
      formMethods?.setValue("maxSalary", vacancyData.maxSalary)
      formMethods?.setValue("currency", vacancyData.currency)

      setKeywords(vacancyData.keywords)
    }
  }, [formMethods, vacancyData])

  useEffect(() => {
    formMethods?.formState.errors.keywords &&
      setKeywordsError(
        formMethods?.formState?.errors?.keywords?.message as string
      )
  }, [formMethods?.formState.errors])

  return isModal ? (
    <Modal open={open} onClose={handleClose}>
      {renderForm()}
    </Modal>
  ) : (
    renderForm()
  )
}

export default VacancySettings
