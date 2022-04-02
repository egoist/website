import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"
import { site } from "~/config"

const PROD = process.env.NODE_ENV === "production"

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        {site.feeds.map((feed) => (
          <link
            key={feed.title}
            rel="alternate"
            type="application/atom+xml"
            href={feed.url}
            title={feed.title}
          />
        ))}
      </Head>
      <body className="dark:bg-dark dark:text-zinc-100">
        <Main />
        <NextScript />
        {PROD && (
          <Script
            strategy="afterInteractive"
            data-website-id="41199b15-9e7e-4354-8e74-95d4c48e178e"
            src="https://umami.egoist.sh/mami.js"
          ></Script>
        )}
      </body>
    </Html>
  )
}
