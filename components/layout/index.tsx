import React from 'react'
import { Global, css } from '@emotion/core'

import { colors } from '../../core/constants/styles'
import { Header } from '../header'
import { Footer } from '../footer'

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div css={styles.container}>
      <Global styles={globalStyles} />
      <div css={styles.wrapper}>
        <Header />
        <main css={styles.content}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

const globalStyles = css`
  html {
    --color-text-dark: ${colors.textDark};
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
    flex: 1;
  `,
}

export { Layout }
