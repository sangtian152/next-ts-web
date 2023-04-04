import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" media="all" href="//at.alicdn.com/t/c/font_3310436_8fu3w977lk5.css"></link>
        <script src="//at.alicdn.com/t/c/font_3310436_8fu3w977lk5.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document