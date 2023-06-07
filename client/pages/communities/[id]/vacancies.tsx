import { NextPage } from "next"
import Head from "next/head"

import { useById } from "dto/hooks/Communities"

import { QueryWrapper, VacancyModal } from "@container"
import CommunityVacancies from "components/modules/CommunityVacancies"

const CommunityPage: NextPage = () => {
  const { data, status } = useById()

  return (
    <>
      <QueryWrapper status={status}>
        <Head>
          <title>{data?.name}</title>
        </Head>
        <CommunityVacancies />
      </QueryWrapper>
      <VacancyModal />
    </>
  )
}

export default CommunityPage
