import { Hydrate, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AppProps } from "next/app"
import Head from "next/head"
import { createGlobalStyle, ThemeProvider } from "styled-components"

import { queryClient, theme } from "@core"

import Layout from "@layout"

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
    margin: 0;
    transition: all 0.2s ease;
    background: #333333;
    overflow-x: hidden;
  }

  * {
    outline: none;
  }

  .container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .container2 {
    position: relative;
    max-width: 1420px;
    margin: 0 auto;
    padding: 0 20px;
  }
`

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>More Community</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
