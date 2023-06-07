import { NextPage } from "next"
import Head from "next/head"

import { useById } from "dto/hooks/Communities"

import { PostModal, QueryWrapper, VacancyModal } from "@container"
import Community from "components/modules/Community"

const CommunityPage: NextPage = () => {
  const { data, status } = useById()

  return (
    <>
      <QueryWrapper status={status}>
        <Head>
          <title>{data?.name}</title>
        </Head>
        <Community />
      </QueryWrapper>
      <PostModal />
      <VacancyModal />
    </>
  )
}

export default CommunityPage
