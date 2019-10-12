import React from 'react'
import { css } from '@emotion/core'

const styles = {
  container: css`
    background-color: #f1f3f5;
  `,
}

const Footer: React.FunctionComponent = () => (
  <footer css={styles.container}>
    <p>Footer</p>
  </footer>
)

export { Footer }
