import React from "react";
import App from "next/app";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <header>
          <h1>A WIP</h1>
        </header>

        <Component {...pageProps} />
      </div>
    )
  }
}

export default MyApp