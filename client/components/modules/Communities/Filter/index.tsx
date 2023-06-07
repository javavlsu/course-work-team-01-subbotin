import { FC } from "react"

import { MdSearch } from "react-icons/md"

import { FilterProps } from "./Filter.interface"

import { Base, Input } from "./Filter.styles"

const Filter: FC<FilterProps> = ({ onSearch }) => {
  return (
    <Base>
      <Input
        placeholder="Поиск"
        prefix={<MdSearch />}
        styleType="light"
        onChange={onSearch}
      />
    </Base>
  )
}

export default Filter
