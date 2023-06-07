import { ReactNode } from "react"
import { QueryStatus, MutationStatus } from "@tanstack/react-query"

export interface QueryWrapperProps {
  status: QueryStatus | MutationStatus
  children: ReactNode
  loader?: ReactNode
  loaderSize?: string
}
