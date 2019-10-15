import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { css } from '@emotion/core'
import validator from 'validator'
import isEmpty from 'lodash.isempty'

import { ValidationReport } from '../core/types/misc'
import { signUp } from '../core/services/auth'
import { Facebook } from '../components/facebook-logo'
import { Google } from '../components/google-logo'

interface InputFields {
  name: string
  email: string
  password: string
}

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Partial<InputFields>>({})
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target

      if (name === 'name') {
        setName(value)
        setErrors({ ...errors, name: '' })
      } else if (name === 'email') {
        setEmail(value)
        setErrors({ ...errors, email: '' })
      } else if (name === 'password') {
        setPassword(value)
        setErrors({ ...errors, password: '' })
      }

      setError('')
    },
    [errors]
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const { isValid, messages } = validate({ name, email, password })

    if (!isValid) {
      setErrors(messages)
      setIsPending(false)
      return
    }

    try {
      await signUp(name, email, password)

      Router.push('/signin')
    } catch (err) {
      const res = await err.response.json()

      setError(res.data.message)
      setIsPending(false)
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
          <h2 css={styles.subHeading}>Join AWIP today</h2>
          <h3 css={styles.heading}>
            Share your progress,
            <br />
            not perfection.
          </h3>
          <div css={styles.sns}>
            <div css={styles.continueWith}>
              <p css={styles.continueWithText}>Continue with</p>
            </div>
            <div css={styles.snsButtons}>
              <button css={[styles.snsButton, styles.facebookButton]}>
                <span css={styles.snsIcon}>
                  <Facebook />
                </span>
                Facebook
              </button>
              <button css={[styles.snsButton, styles.googleButton]}>
                <span css={styles.snsIcon}>
                  <Google />
                </span>
                Google
              </button>
            </div>
          </div>

          <div css={styles.or}>
            <span css={styles.orText}>or</span>
          </div>

          <form css={styles.form} onSubmit={handleSubmit}>
            <div css={styles.field}>
              <label css={styles.label} htmlFor="nameInput">
                Name
              </label>
              <input
                css={[styles.input, errors.name && styles.inputError]}
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
                css={[styles.input, errors.email && styles.inputError]}
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
                css={[styles.input, errors.password && styles.inputError]}
                id="passwordInput"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="8+ characters"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div css={styles.error}>
              <p css={styles.errorText}>{error}</p>
            </div>

            <div css={styles.buttonContainer}>
              <button css={styles.button} type="submit" disabled={isPending}>
                Create Account
              </button>
            </div>

            <p css={styles.terms}>
              By continuing, you agree to AWIP&apos;s{' '}
              <Link href="">
                <a css={styles.termLink}>Terms of Service</a>
              </Link>{' '}
              and{' '}
              <Link href="">
                <a css={styles.termLink}>Privacy Policy.</a>
              </Link>
            </p>
          </form>
        </div>
        <div css={styles.signIn}>
          Already a member?{' '}
          <Link href="/signin">
            <a css={styles.signInLink}>Sign In</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    min-height: 750px;
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
  heading: css`
    margin: 0 0 2rem 0;
    line-height: 1.3;
    font-size: 2rem;
  `,
  subHeading: css`
    font-size: 0.9rem;
    font-weight: 500;
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
    font-size: 1.2rem;
  `,
  sns: css``,
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
  `,
  googleButton: css`
    background-color: rgba(219, 68, 55, 0.95);

    :hover {
      background-color: rgba(219, 68, 55, 1);
    }
  `,
  snsIcon: css`
    position: absolute;
    top: 50%;
    transform: translateY(-47%);
    left: 1rem;
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
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.75rem 1rem;
    background-color: #f1f3f5;
  `,
  inputError: css`
    border-color: #fa5252;
  `,
  terms: css`
    margin-top: 1.5rem;
    line-height: 1.7;
    font-size: 0.8rem;
    color: #555;
  `,
  termLink: css`
    text-decoration: underline;
  `,
  error: css``,
  errorText: css`
    font-size: 0.85rem;
    color: #f03e3e;
  `,
  buttonContainer: css`
    margin-top: 1.5rem;
  `,
  button: css`
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 0.9rem 3.5rem 0.8rem;
    font-weight: 500;
    font-size: 0.9rem;
    background-color: #495057;
    color: white;
    cursor: pointer;

    :hover {
      background-color: #343a40;
    }

    :disabled {
      background-color: #868e96;
    }
  `,
  signIn: css`
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 0.9rem;
  `,
  signInLink: css`
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

function validate({
  name,
  email,
  password,
}: InputFields): ValidationReport<InputFields> {
  const messages: Partial<InputFields> = {}

  if (!name.trim()) {
    messages.name = 'Please enter your name.'
  }

  if (!validator.isEmail(email)) {
    messages.email = 'Please enter a valid email address.'
  }

  if (password.length < 8) {
    messages.password = 'Password must be at least 8 characters.'
  }

  return {
    isValid: isEmpty(messages),
    messages,
  }
}

export default SignUp
