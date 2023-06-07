import {
  ChangeEvent,
  FC,
  useState,
  forwardRef,
  useEffect,
  useRef,
  useCallback
} from "react"
import { v4 as uuid } from "uuid"
import { extension } from "mime-types"

import { getFileSize, filterFile, getFileType, url2file } from "./utils"

import { File } from "@ui"
import { MdUpload } from "react-icons/md"

import {
  UploadProps,
  UploadFileProps,
  UploadValidation
} from "./Upload.interface"

import {
  Base,
  Field,
  FieldInput,
  FieldButton,
  FieldTrigger,
  Files,
  FileBlock,
  FileDelete,
  Loader,
  Description
} from "./Upload.styles"

const Upload: FC<UploadProps> = forwardRef<HTMLInputElement, UploadProps>(
  (
    {
      value,
      className,
      name,
      validation,
      filter,
      onChange,
      accept,
      multiple,
      disabled,
      styleType = "light",
      button,
      withPreviews
    },
    ref
  ) => {
    const [uploadValue, setUploadValue] = useState<UploadFileProps[]>([])
    const [isLoadingInitialization, setIsLoadingInitialization] =
      useState<boolean>(false)
    const [currentValidation, setCurrentValidation] = useState<
      UploadValidation | undefined
    >(validation)

    const uploadRef = useRef<HTMLInputElement | null>(null)

    const handleInitializeFile = useCallback(
      (file: File) => {
        const filteredFile = filterFile({
          file: file,
          filter: filter,
          currentLength: uploadValue.length
        })

        if (filteredFile) {
          const newFile: UploadFileProps = {
            id: uuid(),
            thumbUrl: URL.createObjectURL(filteredFile),
            name: filteredFile.name,
            type: getFileType(filteredFile.type),
            mimeType: filteredFile.type,
            size: getFileSize(filteredFile.size),
            extension: extension(filteredFile.type).toString(),
            originalFile: filteredFile
          }

          const newUploadedFiles = [...uploadValue, newFile]
          setUploadValue(newUploadedFiles)

          onChange && onChange(newUploadedFiles)
        }
      },
      [filter, onChange, uploadValue]
    )

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        const files = event.target.files && Array.from(event.target.files)

        files &&
          files.forEach((file) => {
            handleInitializeFile(file)
          })
      }
    }

    const handleDelete = (fileId: string) => {
      const newUploadedFiles = uploadValue.filter((file) => file.id !== fileId)
      setUploadValue(newUploadedFiles)

      onChange && onChange(newUploadedFiles)
    }

    useEffect(() => {
      if (Array.isArray(value)) {
          const getFiles = async () => {
              setIsLoadingInitialization(true)

              const _files: UploadFileProps[] = await Promise.all(
                  value?.map(async (file) => {
                      const _file = await url2file(file.url, file.name)

                      const newFile: UploadFileProps = {
                          id: uuid(),
                          thumbUrl: file.url,
                          name: file.name,
                          type: getFileType(_file.type),
                          mimeType: _file.type,
                          size: getFileSize(_file.size),
                          extension: extension(_file.type).toString(),
                          originalFile: _file
                      }

                      return newFile
                  }) || []
              )

              setUploadValue(_files)
              setIsLoadingInitialization(false)
          }

          getFiles()
      }
    }, [])

    useEffect(() => {
      setCurrentValidation(validation || undefined)
    }, [setCurrentValidation, validation])

    return (
      <Base className={className}>
        <Field>
          <FieldInput
            ref={(node) => {
              if (node) {
                uploadRef.current = node

                if (typeof ref === "function") {
                  ref(node)
                } else if (ref) {
                  ref.current = node
                }
              }
            }}
            type="file"
            name={name}
            multiple={multiple}
            disabled={disabled}
            accept={accept}
            onChange={handleChange}
          />
          <FieldTrigger onClick={() => button && uploadRef.current?.click()}>
            {!button ? (
              <FieldButton
                onClick={() => !button && uploadRef.current?.click()}
                styleType={styleType}>
                <MdUpload />
                Загрузить
              </FieldButton>
            ) : (
              button
            )}
          </FieldTrigger>
        </Field>
        {!!withPreviews && (
          <Files>
            {!isLoadingInitialization ? (
              uploadValue.map((item) => (
                <FileBlock key={item.id}>
                  <File url={item.thumbUrl} styleType={styleType} {...item} />
                  <FileDelete onClick={() => handleDelete(item.id)} />
                </FileBlock>
              ))
            ) : (
              <>
                Инициализация файлов
                <Loader>
                  <span />
                  <span />
                  <span />
                </Loader>
              </>
            )}
          </Files>
        )}
        {currentValidation?.message && (
          <Description type={currentValidation?.type}>
            {currentValidation.message}
          </Description>
        )}
      </Base>
    )
  }
)

Upload.displayName = "Upload"

export default Upload
