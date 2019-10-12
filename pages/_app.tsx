import React from 'react'
import App from 'next/app'

import { Header, Footer } from '../components'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <div>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default MyApp
