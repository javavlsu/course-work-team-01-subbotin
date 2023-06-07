import { FC, useState } from "react"

import Authorization from "./Authorization"
import Registration from "./Registration"

import { Base } from "./Authentication.styles"

const Authentication: FC = () => {
  const [formType, setFormType] = useState<"authorization" | "registration">(
    "authorization"
  )

  return (
    <Base>
      {formType === "authorization" ? (
        <Authorization changeForm={setFormType} />
      ) : (
        <Registration changeForm={setFormType} />
      )}
    </Base>
  )
}

export default Authentication
