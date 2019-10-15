import React from 'react'
import { css } from '@emotion/core'

import { Header } from '../header'
import { Footer } from '../footer'

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div css={styles.container}>
      <div css={styles.wrapper}>
        <Header />
        <main css={styles.content}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

const styles = {
  container: css``,
  wrapper: css`
    margin: 0 auto;
    max-width: 1024px;
    /* [1] Sticky footer */
    display: flex; /* [1] */
    flex-direction: column; /* [1] */
    min-height: 100vh; /* [1] */
  `,
  content: css`
    display: flex;
    flex: 1;
  `,
}

export { Layout }
