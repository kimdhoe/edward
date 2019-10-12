import React from 'react'
import App from 'next/app'

import { Header } from '../components/header'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <div>
        <Header />

        <Component {...pageProps} />
      </div>
    )
  }
}

export default MyApp
