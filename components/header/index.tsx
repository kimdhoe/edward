import React from 'react'
import { css } from '@emotion/core'

const styles = {
  container: css`
    background-color: #f1f3f5;
  `,
}

const Header: React.FunctionComponent = () => (
  <header css={styles.container}>
    <h1>A-WIP</h1>
  </header>
)

export { Header }
