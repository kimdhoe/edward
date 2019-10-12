import React from 'react'
import App from 'next/app'
import { css } from '@emotion/core'
import 'normalize.css/normalize.css'

import '../style.css'

import { Header, Footer } from '../components'

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

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <div css={styles.container}>
        <Header />
        <main css={styles.content}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default MyApp
