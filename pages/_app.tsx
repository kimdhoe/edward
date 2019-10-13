import React from 'react'
import App, { AppContext } from 'next/app'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import 'normalize.css/normalize.css'

import '../style.css'
import { initializeStore } from '../core/store'
import { Layout } from '../components/layout'

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      )
    }
  }
)

export default MyAppWithRedux
