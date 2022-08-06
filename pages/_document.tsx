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
        <link
          rel="icon"
          href="/favicon_v1.png"
          type="image/png"
          sizes="80x80"
        />
      </Head>
      <body className="">
        <Main />
        <NextScript />
        {process.env.NODE_ENV === "production" && (
          <script
            async
            data-website-id="c83fb747-c4bd-42e8-9668-b2790be38b67"
            src="https://umami.egoist.dev/mami.js"
          ></script>
        )}
      </body>
    </Html>
  )
}
