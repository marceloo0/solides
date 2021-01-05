import { AppProps } from 'next/app'

import GlobalStyle from '../styles/global'

import AppProvider from '../hooks/index'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}

export default MyApp
