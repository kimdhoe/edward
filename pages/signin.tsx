import React, { useState, useCallback } from 'react'
import { css } from '@emotion/core'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'email') setEmail(value)
    else if (name === 'password') setPassword(value)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email)
    console.log(password)
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
