import React from 'react'
import { css } from '@emotion/core'

const Footer: React.FunctionComponent = () => (
  <footer css={styles.container}>
    <p>Footer</p>
  </footer>
)

const styles = {
  container: css`
    background-color: #f1f3f5;
  `,
}

export { Footer }
