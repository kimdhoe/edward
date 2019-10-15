import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/core'
import validator from 'validator'
import isEmpty from 'lodash.isempty'

import { ValidationReport } from '../core/types/misc'
import { signIn } from '../core/services/auth'
import { gotUser } from '../core/actions/user'
import { Facebook } from '../components/facebook-logo'
import { Google } from '../components/google-logo'

interface InputFields {
  email: string
  password: string
}

const SignIn = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Partial<InputFields>>({})
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target

      if (name === 'email') {
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

    const { isValid, messages } = validate({ email, password })

    if (!isValid) {
      setErrors(messages)
      setIsPending(false)
      return
    }

    try {
      const res = await signIn(email, password)

      if (res.ok) {
        dispatch(gotUser(res.data.user))

        Router.push('/')
      } else {
        setError(res.data.message)
        setIsPending(false)
      }
    } catch (err) {
      setError("Something's not right. Try again.")
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
          <h3 css={styles.subHeading}>Welcome back</h3>
          <h2 css={styles.heading}>Sign in to AWIP.</h2>

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
              <label css={styles.label} htmlFor="emailInput">
                Email
              </label>
              <input
                css={[styles.input, errors.email && styles.inputError]}
                id="emailInput"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div css={styles.field}>
              <div css={styles.labelRow}>
                <label css={styles.label} htmlFor="passwordInput">
                  Password
                </label>
                <Link href="">
                  <a css={styles.forgotPassword}>Forgot password?</a>
                </Link>
              </div>
              <input
                css={[styles.input, errors.password && styles.inputError]}
                id="passwordInput"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div css={styles.error}>
              <p css={styles.errorText}>{error}</p>
            </div>

            <div css={styles.buttonContainer}>
              <button css={styles.button} type="submit" disabled={isPending}>
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div css={styles.signUp}>
          Not a member?{' '}
          <Link href="/signup">
            <a css={styles.signUpLink}>Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    min-height: 600px;
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
  subHeading: css`
    font-size: 0.9rem;
    font-weight: 500;
  `,
  heading: css`
    margin: 0 0 2rem 0;
    line-height: 1.3;
    font-size: 2rem;
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
      background-color: #bbb;
    }
  `,
  orText: css`
    padding: 0 0.5rem;
    letter-spacing: 0.05rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #888;
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
  `,
  googleButton: css`
    background-color: rgba(219, 68, 55, 0.95);
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
  labelRow: css`
    display: flex;
    justify-content: space-between;
  `,
  label: css`
    margin-bottom: 0.4rem;
    font-weight: 500;
    font-size: 0.9rem;
  `,
  forgotPassword: css`
    font-size: 0.8rem;
    color: #719192;
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
  signUp: css`
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 0.9rem;
  `,
  signUpLink: css`
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

SignIn.Layout = Layout

function validate({
  email,
  password,
}: InputFields): ValidationReport<InputFields> {
  const messages: Partial<InputFields> = {}

  if (!validator.isEmail(email)) {
    messages.email = 'Please enter your email address.'
  }

  if (!password.length) {
    messages.password = 'Please enter a password'
  }

  return {
    isValid: isEmpty(messages),
    messages,
  }
}

export default SignIn
