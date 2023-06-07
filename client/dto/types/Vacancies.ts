export interface Vacancy {
  id: number
  title: string
  content: string
  keywords: string[]
  minSalary: number
  maxSalary?: number
  currency: string
  views: number
  createdAt: string
  isMyResponse: boolean
  responsesCount: number
  isCommunityOwner: boolean
}

export interface Respond {
  isMyResponse: boolean
  count: number
}

export interface PostVacancy {
  id?: number
  title: string
  content: string
  minSalary: number
  maxSalary: number
  currency: string
  keywords: string[]
}

export type Delete = boolean
