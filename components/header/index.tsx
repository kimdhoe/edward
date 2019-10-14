import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { css } from '@emotion/core'

import { AppState } from '../../core/store'

interface Props {
  user: any
}

const _Header: React.FunctionComponent<Props> = ({ user }) => (
  <header css={styles.container}>
    <h1>
      <Link href="/">
        <a>A-WIP</a>
      </Link>
    </h1>
    <nav>{user ? <NavSignedIn /> : <NavSignedOut />}</nav>
  </header>
)

const NavSignedIn = () => (
  <div css={styles.nav}>
    <button>Sign Out</button>
  </div>
)

const NavSignedOut = () => (
  <div css={styles.nav}>
    <Link href="/signin">
      <a css={styles.navLink}>Log In</a>
    </Link>
    <Link href="/signup">
      <a css={styles.navLink}>Sign Up</a>
    </Link>
  </div>
)

const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  nav: css`
    display: flex;
  `,
  navLink: css`
    margin-left: 1.2rem;

    &:first-of-type {
      margin-left: 0;
    }
  `,
}

const mapStateToProps = (state: AppState) => ({ user: state.user })

const Header = connect(mapStateToProps)(_Header)

export { Header }
