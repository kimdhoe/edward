import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { css } from '@emotion/core'

import { signUp } from '../core/services/auth'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'name') setName(value)
    else if (name === 'email') setEmail(value)
    else if (name === 'password') setPassword(value)

    setError('')
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signUp(name, email, password)
      Router.push('/signin')
    } catch (err) {
      const res = await err.response.json()
      setError(res.data.message)
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
          <h3 css={styles.slogan}>
            Share your progress,
            <br />
            not perfection.
          </h3>

          <h2 css={styles.join}>Join AWIP today</h2>

          <button css={[styles.snsBuitton, styles.facebookButton]}>
            Continue with Facebook
          </button>
          <button css={[styles.snsBuitton, styles.googleButton]}>
            Continue with Google
          </button>

          <div css={styles.or}>
            <span css={styles.orText}>or</span>
          </div>

          <form css={styles.form} onSubmit={handleSubmit}>
            <div css={styles.field}>
              <label css={styles.label} htmlFor="nameInput">
                Name
              </label>
              <input
                css={styles.input}
                id="nameInput"
                name="name"
                type="text"
                autoComplete="new-password"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div css={styles.field}>
              <label css={styles.label} htmlFor="emailInput">
                Email
              </label>
              <input
                css={styles.input}
                id="emailInput"
                name="email"
                type="email"
                autoComplete="new-password"
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
                autoComplete="new-password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div css={styles.error}>
              <p css={styles.errorText}>{error}</p>
            </div>

            <div css={styles.buttonContainer}>
              <button css={styles.button} type="submit">
                Create Account
              </button>
            </div>

            <p css={styles.terms}>
              By continuing, you agree to AWIP&apos;s Terms of Service and
              Privacy Policy.
            </p>
          </form>
        </div>
        <div css={styles.signin}>
          Already a member?{' '}
          <Link href="/signin">
            <a css={styles.signinLink}>Sign In</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    min-height: 800px;
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
    position: relative;
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
    line-height: 1.3;
    font-size: 1.7rem;
  `,
  join: css`
    font-size: 1.05rem;
  `,
  or: css`
    margin: 2rem 0;
    display: flex;
    align-items: center;

    ::before,
    ::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: #aaa;
    }
  `,
  orText: css`
    padding: 0 0.5rem;
    letter-spacing: 0.05rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #777;
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
    border-radius: 5px;
    margin-bottom: 0.75rem;
    padding: 0.9rem;
    width: 100%;
    font-size: 0.95rem;
    color: white;
    cursor: pointer;
  `,
  facebookButton: css`
    background-color: rgba(66, 103, 178, 0.97);
  `,
  googleButton: css`
    margin-bottom: 0;
    background-color: rgba(219, 68, 55, 0.95);
  `,
  form: css``,
  field: css`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
  `,
  label: css`
    margin-bottom: 0.4rem;
    font-weight: 500;
    font-size: 0.9rem;
  `,
  input: css`
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0.75rem 1rem;
    background-color: #f1f3f5;
  `,
  terms: css`
    line-height: 1.7;
    font-size: 0.85rem;
    color: #555;
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
    border-radius: 5px;
    padding: 0.9rem 1.4rem 0.8rem;
    font-weight: 500;
    font-size: 0.9rem;
    background-color: #3c4245;
    color: white;
    cursor: pointer;
  `,
  signin: css`
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 0.9rem;
  `,
  signinLink: css`
    color: #719192;
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

SignUp.Layout = Layout

export default SignUp
