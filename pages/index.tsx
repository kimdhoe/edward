import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import { Store } from 'redux'

import { User } from '../core/types/account'

type NextPageContextWithStore = NextPageContext & { store: Store }

interface Props {
  works: Work[]
}

interface Work {
  id: string
  name: string
  category: string
  description: string
  creator: any
}

const Home: NextPage<Props> = ({ works }) => {
  useEffect(() => {}, [])

  return (
    <div css={styles.container}>
      <div css={styles.latestWorks}>
        <h2 css={styles.latestWorksHeading}>Latest</h2>
        <div css={styles.latestWorksContainer}>
          {works.map(work => (
            <div key={work.id}>
              <WorkCard
                id={work.id}
                name={work.name}
                category={work.category}
                creator={work.creator}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface WorkCardProps {
  id: string
  name: string
  category: string
  creator: User
}

const WorkCard: React.FunctionComponent<WorkCardProps> = ({
  id,
  name,
  category,
  creator,
}) => {
  return (
    <Link href={`/works/${id}`}>
      <a>
        <div css={workCardStyles.container}>
          <div css={workCardStyles.image}></div>
          <div css={workCardStyles.content}>
            <div css={workCardStyles.name}>
              <p css={workCardStyles.nameText}>{name}</p>
            </div>
            <div css={workCardStyles.category}>
              <p css={workCardStyles.categoryText}>{category}</p>
            </div>
            <div css={workCardStyles.creator}>
              <div css={workCardStyles.creatorAvatar} />
              <div css={workCardStyles.creatorName}>{creator.name}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

const workCardStyles = {
  container: css`
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    width: 250px;
  `,
  image: css`
    width: 100%;
    height: 150px;
    background-color: #f1f3f5;
  `,
  content: css`
    padding: 1rem;
  `,
  name: css``,
  nameText: css`
    margin: 0;
    font-weight: 500;
  `,
  category: css`
    margin-top: 1rem;
    display: flex;
  `,
  categoryText: css`
    margin: 0;
    padding: 0.2rem 0.5rem;
    font-size: 0.9rem;
    background-color: #f1f3f5;
  `,
  creator: css`
    display: flex;
    align-items: center;
    margin-top: 1rem;
  `,
  creatorAvatar: css`
    margin-right: 0.9rem;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #f1f3f5;
  `,
  creatorName: css``,
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  return {
    works: [
      {
        id: '1',
        name: 'First Work',
        category: 'Art',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, similique sit? Praesentium consectetur, repudiandae sequi perspiciatis molestias voluptatibus natus quibusdam libero illum voluptate dolores pariatur nemo id! Expedita, repellendus perferendis!',
        creator: {
          id: '1',
          name: 'Anton David',
          email: '',
        },
      },
    ],
  }
}

const styles = {
  container: css`
    padding-top: 3rem;
    width: 100%;
  `,
  latestWorks: css`
    /* background-color: #c3fae8; */
  `,
  latestWorksHeading: css`
    margin: 0 0 1.5rem 0;
    padding: 0 1.5rem;
  `,
  latestWorksContainer: css`
    padding: 0 1.5rem;
  `,
}

export default Home
