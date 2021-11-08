import pages from '$pages'
import Link from 'next/link'
import DefaultLayout from './default'
import siteConfig from '$siteConfig'

export default function ({ children }) {
  return (
    <>
      <DefaultLayout title={siteConfig.title}>
        {children}
        <section className="section">
          <div className="section-title">Blog Posts</div>
          <div className="posts">
            {pages
              .filter((page) => page.layout === 'post')
              .map((page) => {
                return (
                  <div key={page.slug} className="box post">
                    <Link href={page.permalink}>
                      <a className="post-title">
                        <h2>{page.title}</h2>
                      </a>
                    </Link>
                  </div>
                )
              })}
          </div>
        </section>
      </DefaultLayout>
      <style jsx>
        {`
          .post-title h2 {
            font-size: 1rem;
          }
        `}
      </style>
    </>
  )
}
