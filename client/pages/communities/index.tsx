import { NextPage } from "next"
import Head from "next/head"

import Communities from "components/modules/Communities"

const CommunitiesPage: NextPage = () => (
  <>
    <Head>
      <title>Сообщества</title>
    </Head>
    <Communities />
  </>
)

export default CommunitiesPage
