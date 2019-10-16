import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'

import { AppState } from '../../core/store'
import { Account } from '../../core/types/account'
import * as auth from '../../core/services/auth'

const Header: React.FunctionComponent = () => {
  const account = useSelector((state: AppState) => state.account)

  return (
    <header css={styles.container}>
      <h1>
        <Link href="/">
          <a>A-WIP</a>
        </Link>
      </h1>
      <nav>
        {account ? <NavSignedIn account={account} /> : <NavSignedOut />}
      </nav>
    </header>
  )
}

interface NavSignedInProps {
  account: Account
}

const NavSignedIn: React.FunctionComponent<NavSignedInProps> = ({
  account,
}) => {
  const handleSignOut = async () => {
    await auth.signOut()
    window.location.reload(true)
  }

  return (
    <div css={styles.nav}>
      <div css={styles.navItem}>{account.name}</div>
      <div css={styles.navItem}>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  )
}

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
    align-items: center;
  `,
  navItem: css`
    margin-left: 1.2rem;

    &:first-of-type {
      margin-left: 0;
    }
  `,
  navLink: css`
    margin-left: 1.2rem;

    &:first-of-type {
      margin-left: 0;
    }
  `,
}

export { Header }
