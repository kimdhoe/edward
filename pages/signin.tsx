import React, { useState, useCallback } from 'react'
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
      <h2>Sign In</h2>
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
  )
}

const styles = {
  container: css``,
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
    max-width: 300px;
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
  `,
}

export default SignIn
