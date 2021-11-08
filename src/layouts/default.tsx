import Head from 'next/head'
import siteConfig from '$siteConfig'
import { Nav } from '../components/Nav'

export default function ({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title?: string
  description?: string
}) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {title && <meta name="twitter:title" />}
        {description && <meta name="description" content={description} />}
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        <meta name="twitter:card" content="summary" />
        {siteConfig.twitter && (
          <meta name="twiter:site" content={siteConfig.twitter} />
        )}
      </Head>
      <div className="app">
        <Nav />
        <div className="container">
          <main>
            <div className="page-content">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
