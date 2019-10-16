import React, { useState } from 'react'
import Router from 'next/router'
import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'

import { signIn, continueWithFacebook } from '../../core/services/auth'
import { gotUser } from '../../core/actions/user'
import { Facebook } from '../facebook-logo'
import { Google } from '../google-logo'

export const ContinueWithSNS = () => {
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)

  const handleFacebookPress = async () => {
    setIsPending(true)
    FB.login(
      async fbRes => {
        if (fbRes.status !== 'connected') {
          setIsPending(false)
          return
        }

        const res = await continueWithFacebook({
          accessToken: fbRes.authResponse.accessToken,
        })

        if (res.ok) {
          dispatch(gotUser(res.data.user))
          Router.push('/')
        } else {
          setIsPending(false)
          console.log(res.data.message)
        }
      },
      {
        scope: 'public_profile,email',
      }
    )
  }
  return (
    <div css={styles.container}>
      <div css={styles.continueWith}>
        <p css={styles.continueWithText}>Continue with</p>
      </div>
      <div css={styles.snsButtons}>
        <button
          css={[styles.snsButton, styles.facebookButton]}
          disabled={isPending}
          onClick={handleFacebookPress}
        >
          <span css={styles.snsIcon}>
            <Facebook />
          </span>
          Facebook
        </button>
        <button
          css={[styles.snsButton, styles.googleButton]}
          disabled={isPending}
        >
          <span css={styles.snsIcon}>
            <Google />
          </span>
          Google
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: css``,
  continueWith: css`
    margin: 1rem 0;
    display: flex;
    align-items: center;

    ::before,
    ::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: #bbb;
    }
  `,
  continueWithText: css`
    padding: 0 0.5rem;
    letter-spacing: 0.05rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #888;
  `,
  snsButtons: css`
    display: flex;
    justify-content: space-between;
  `,
  snsButton: css`
    position: relative;
    outline: none;
    border: none;
    border-radius: 4px;
    margin-bottom: 0.75rem;
    padding: 0.9rem 0;
    width: 49%;
    font-size: 0.95rem;
    color: white;
    cursor: pointer;
  `,
  facebookButton: css`
    background-color: rgba(66, 103, 178, 0.97);

    :hover {
      background-color: rgba(66, 103, 178, 1);
    }

    :disabled {
      background-color: rgba(66, 103, 178, 0.7);
    }
  `,
  googleButton: css`
    background-color: rgba(219, 68, 55, 0.95);

    :hover {
      background-color: rgba(219, 68, 55, 1);
    }

    :disabled {
      background-color: rgba(219, 68, 55, 0.7);
    }
  `,
  snsIcon: css`
    position: absolute;
    top: 50%;
    transform: translateY(-47%);
    left: 1rem;
  `,
}
