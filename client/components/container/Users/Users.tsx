import { FC } from "react"

import { Avatar } from "@ui"

import { UsersProps } from "./Users.interface"

import { Base, User, UserData } from "./Users.styles"

const Users: FC<UsersProps> = ({ users, notFoundText }) => {
  return (
    <Base>
      {users?.length
        ? users?.map((item) => (
            <User key={item.id}>
              <Avatar
                img={item.avatar || ""}
                alt={item.username || ""}
                size="small"
                styleType="dark"
              />
              <UserData>
                <span>{item.username}</span>
                <p>{item.email}</p>
              </UserData>
            </User>
          ))
        : notFoundText}
    </Base>
  )
}

export default Users
