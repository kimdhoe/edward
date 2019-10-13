import React from 'react'
import { css } from '@emotion/core'

import { Header } from '../header'
import { Footer } from '../footer'

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div css={styles.container}>
      <Header />
      <main css={styles.content}>{children}</main>
      <Footer />
    </div>
  )
}

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

export { Layout }
