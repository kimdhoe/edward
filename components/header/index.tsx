import React from 'react'
import { connect } from 'react-redux'
import { css } from '@emotion/core'

import { AppState } from '../../core/store'

interface Props {
  user: any
}

const _Header: React.FunctionComponent<Props> = ({ user }) => (
  <header css={styles.container}>
    <h1>A-WIP</h1>
    <nav>{user ? <div>{user.name}</div> : <div>Login</div>}</nav>
  </header>
)

const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f1f3f5;
  `,
}

const mapStateToProps = (state: AppState) => ({ user: state.user })

const Header = connect(mapStateToProps)(_Header)

export { Header }
