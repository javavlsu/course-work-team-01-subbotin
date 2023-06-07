export interface IPagination {
    currentPage: number
    total: number
    pageSize: number
    siblingCount?: number
    onChange: (page: number) => void
}
