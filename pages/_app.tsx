import React from 'react'
import App, { AppContext } from 'next/app'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { Global, css } from '@emotion/core'
import 'normalize.css/normalize.css'

import '../style.css'
import { initializeStore } from '../core/store'
import { Layout } from '../components/layout'
import { colors } from '../core/constants/styles'
import { NextComponentType } from 'next'
import { populateUserIfPossible } from '../core/services/auth'

type NextComponentTypeWithLayout = NextComponentType & {
  Layout?: React.FunctionComponent
}

interface Props {
  store: Store
}

const MyAppWithRedux = withRedux(initializeStore)(
  class MyApp extends App<Props> {
    static async getInitialProps(appContext: AppContext) {
      const { Component, ctx } = appContext

      await populateUserIfPossible(ctx)

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
      }
    }

    render() {
      const { Component, pageProps, store } = this.props
      const PageLayout =
        (Component as NextComponentTypeWithLayout).Layout || Layout

      return (
        <Provider store={store}>
          <Global styles={globalStyles} />
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </Provider>
      )
    }
  }
)

const globalStyles = css`
  html {
    --color-text-dark: ${colors.textDark};

    box-sizing: border-box;

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }

  body {
    color: var(--color-text-dark);
  }

  a {
    text-decoration: none;
    color: var(--color-text-dark);
    cursor: pointer;
  }
`

export default MyAppWithRedux
