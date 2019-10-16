import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <FacebookInitScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

const FacebookInitScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.fbAsyncInit = function() {
          FB.init({
            appId      : ${process.env.FACEBOOK_APP_ID},
            cookie     : true,
            xfbml      : true,
            version    : 'v4.0'
          });
          FB.AppEvents.logPageView();
        };
        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `,
    }}
  ></script>
)

export default MyDocument
