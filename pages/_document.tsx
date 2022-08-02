import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="">
        <Main />
        <NextScript />
        {process.env.NODE_ENV === "production" && (
          <script
            async
            data-website-id="41199b15-9e7e-4354-8e74-95d4c48e178e"
            src="https://umami.egoist.dev/mami.js"
          ></script>
        )}
      </body>
    </Html>
  )
}
