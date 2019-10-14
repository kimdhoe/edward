import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { Store } from 'redux'
import { connect } from 'react-redux'

type NextPageContextWithStore = NextPageContext & { store: Store }

interface Props {
  projects: number[]
}

const _Home: NextPage<Props> = ({ projects }) => {
  useEffect(() => {}, [])

  return (
    <div>
      <h2>Home</h2>

      <div>
        {projects.map(project => (
          <div key={project}>
            <p>project</p>
          </div>
        ))}
      </div>
    </div>
  )
}

_Home.getInitialProps = async (context: NextPageContextWithStore) => {
  return {
    projects: [0, 1, 2, 3, 4, 5],
  }
}

const Home = connect(state => state)(_Home)

export default Home
