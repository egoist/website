import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="dark:bg-dark dark:text-zinc-200">
        <Main />
        <NextScript />
        {process.env.NODE_ENV === "production" && (
          <script
            async
            data-website-id="41199b15-9e7e-4354-8e74-95d4c48e178e"
            src="https://umami.egoist.sh/mami.js"
          ></script>
        )}
      </body>
    </Html>
  )
}
