import React from 'react'
import App, { AppContext } from 'next/app'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { css } from '@emotion/core'
import 'normalize.css/normalize.css'

import '../style.css'
import { initializeStore } from '../core/store'
import { Header, Footer } from '../components'

interface Props {
  store: Store
}

const MyAppWithRedux = withRedux(initializeStore)(
  class MyApp extends App<Props> {
    static async getInitialProps({ Component, ctx }: AppContext) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
      }
    }

    render() {
      const { Component, pageProps, store } = this.props

      return (
        <Provider store={store}>
          <div css={styles.container}>
            <Header />
            <main css={styles.content}>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </Provider>
      )
    }
  }
)

const styles = {
  container: css`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  `,
  content: css`
    flex: 1;
  `,
}

export default MyAppWithRedux
