export interface Response<Data> {
  status: number
  message: string
  data: Data
}

export interface PaginationData<Data> {
  items: Data
  count: number
  page: number
  limit: number
}

export interface ResponsePagination<Data> {
  status: number
  message: string
  data: PaginationData<Data>
}
