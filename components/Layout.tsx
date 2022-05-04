import Head from "next/head"
import { UniLink } from "./UniLink"
import { site } from "~/config"
import { SiteHeader } from "./SiteHeader"

export const Layout: React.FC<{
  title?: string
  description?: string
  cover?: string
}> = ({ children, title, description, cover }) => {
  const documentTitle = title ? `${title} - ${site.title}` : site.title
  return (
    <>
      <Head>
        <title>{documentTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta
          name="twitter:card"
          content={cover ? "summary_large_image" : "summary"}
        />
        <meta name="twitter:site" content="_egoistlily" />
        <meta name="twitter:title" content={documentTitle} />
        <meta name="og:title" content={documentTitle} />
        {description && (
          <>
            <meta name="twitter:description" content={description} />
            <meta name="og:description" content={description} />
          </>
        )}
        {cover && (
          <>
            <meta name="twitter:image" content={cover} />
            <meta name="og:image" content={cover} />
          </>
        )}
      </Head>
      <SiteHeader />
      <div className="container py-16">{children}</div>
      <footer className="py-10 text-zinc-500 italic">
        <div className="container">
          <div>
            Made by{" "}
            <UniLink href="/" className="hover:text-brand">
              EGOIST
            </UniLink>{" "}
            -{" "}
            <UniLink
              href="https://github.com/egoist/website"
              className="hover:text-brand"
            >
              Built with Next.js
            </UniLink>
          </div>
        </div>
      </footer>
    </>
  )
}
