import React, { useState, useCallback } from 'react'
import { css } from '@emotion/core'

import { useWorkService } from '../core/services/work'

const NewWork = () => {
  const workService = useWorkService()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      setName(e.target.value)
    } else if (e.target.name === 'description') {
      setDescription(e.target.value)
    } else if (e.target.name === 'category') {
      setCategory(e.target.value)
    }
  }, [])

  const handleStart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(name, description, category)
    const res = await workService.createWork({ name, description, category })
    console.log(res)
  }

  return (
    <div css={styles.container}>
      <h2>Start a new work.</h2>

      <div css={styles.field}>
        <label css={styles.label} htmlFor="name-input">
          Name
        </label>
        <input
          css={styles.input}
          id="name-input"
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div css={styles.field}>
        <label css={styles.label} htmlFor="description-input">
          Description
        </label>
        <input
          css={styles.input}
          id="description-input"
          name="description"
          type="text"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div css={styles.field}>
        <label css={styles.label} htmlFor="category-input">
          Category
        </label>
        <input
          css={styles.input}
          id="category-input"
          name="category"
          type="text"
          value={category}
          onChange={handleChange}
        />
      </div>

      <div css={styles.controls}>
        <button css={styles.startButton} type="button" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    padding: 0 1.5rem;
  `,
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
  controls: css`
    margin-top: 1.5rem;
  `,
  startButton: css`
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 0.9rem 3.5rem 0.8rem;
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
}

export default NewWork
