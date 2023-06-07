import { FC, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useOnClickOutside } from "usehooks-ts"

import { ModalProps } from "./Modal.interafce"

import { Overlay, Base, Portal } from "./Modal.styles"

const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const [modalsCount, setModalsCount] = useState<number>(0)

  const baseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = document.createElement("div")

    const target = document.body

    el?.classList.add("modal-root")

    el && target.appendChild(el)

    setEl(el)
    setModalsCount(document.querySelectorAll(".modal-root").length)

    return () => {
      el && target.removeChild(el)

      setEl(null)
      setModalsCount(document.querySelectorAll(".modal-root").length)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
  }, [open])

  useOnClickOutside(baseRef, onClose)

  return (
    <>
      {el &&
        open &&
        createPortal(
          <>
            <Overlay
              style={{
                zIndex: modalsCount + 110
              }}
            />
            <Portal
              style={{
                zIndex: modalsCount + 110
              }}>
              <Base ref={baseRef}>{children}</Base>
            </Portal>
          </>,
          el
        )}
    </>
  )
}

export default Modal
