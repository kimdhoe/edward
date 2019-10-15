import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/core'

import { signIn } from '../core/services/auth'
import { gotUser } from '../core/actions/user'

const SignIn = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'email') setEmail(value)
    else if (name === 'password') setPassword(value)

    setError('')
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await signIn(email, password)

      if (res.ok) {
        dispatch(gotUser(res.data.user))
        Router.push('/')
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

  return (
    <div css={styles.container}>
      <div css={styles.left}>
        <h1 css={styles.logo}>
          <Link href="/">
            <a css={styles.logoText}>AWIP</a>
          </Link>
        </h1>
        <div css={styles.bullets}>
          <p css={styles.bullet}>Annouunce your progress.</p>
          <p css={styles.bullet}>See what people are making.</p>
          <p css={styles.bullet}>Join the conversation.</p>
        </div>
      </div>

      <div css={styles.right}>
        <div css={styles.rightWrapper}>
          <h2 css={styles.heading}>Sign In</h2>

          <p css={styles.slogan}>Share your progress, not perfection.</p>

          <button css={[styles.snsBuitton, styles.facebookButton]}>
            Continue with Facebook
          </button>
          <button css={[styles.snsBuitton, styles.googleButton]}>
            Continue with Google
          </button>

          <p>or</p>

          <form css={styles.form} onSubmit={handleSubmit}>
            <div css={styles.field}>
              <label css={styles.label} htmlFor="emailInput">
                Email
              </label>
              <input
                css={styles.input}
                id="emailInput"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div css={styles.field}>
              <label css={styles.label} htmlFor="passwordInput">
                Password
              </label>
              <input
                css={styles.input}
                id="passwordInput"
                name="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div css={styles.error}>
              <p css={styles.errorText}>{error}</p>
            </div>

            <div css={styles.buttonContainer}>
              <button css={styles.button} type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    flex: 1;
    display: flex;
    flex-direction: row;
  `,
  left: css`
    padding: 2.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f1f3f5;
    background: url('/static/images/marcus-p.jpg') center center;
    background-size: cover;
  `,
  right: css`
    padding: 2.5rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  logo: css`
    margin-bottom: 2.5rem;
  `,
  logoText: css`
    color: #f1f3f5;
  `,
  rightWrapper: css`
    width: 350px;
  `,
  heading: css``,
  slogan: css`
    margin: 0 0 2rem 0;
    font-size: 1.1rem;
  `,
  bullets: css`
    color: #f1f3f5;
  `,
  bullet: css`
    margin: 0 0 1.5rem 0;
    font-size: 1.3rem;
  `,
  snsBuitton: css`
    outline: none;
    border: none;
    margin-bottom: 1rem;
    padding: 1rem;
    width: 100%;
    font-size: 0.95rem;
    color: white;
    cursor: pointer;
  `,
  facebookButton: css`
    background-color: rgba(66, 103, 178, 0.97);
  `,
  googleButton: css`
    background-color: rgba(219, 68, 55, 0.95);
  `,
  form: css``,
  field: css`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
  `,
  label: css`
    margin-bottom: 0.5rem;
  `,
  input: css`
    outline: none;
    border: none;
    padding: 1rem;
    width: 100%;
    /* max-width: 300px; */
    background-color: #f1f3f5;
  `,
  error: css``,
  errorText: css`
    color: red;
  `,
  buttonContainer: css`
    margin-top: 1.5rem;
  `,
  button: css`
    outline: none;
    border: none;
    padding: 1rem;
    background-color: #f1f3f5;
    cursor: pointer;
  `,
}

const Layout: React.FunctionComponent = ({ children }) => (
  <div
    css={css`
      display: flex;
      height: 100vh;
    `}
  >
    {children}
  </div>
)

SignIn.Layout = Layout

export default SignIn
