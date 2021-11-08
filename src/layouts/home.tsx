import pages from '$pages'
import Link from 'next/link'
import DefaultLayout from './default'
import siteConfig from '$siteConfig'

export default function ({ children }) {
  return (
    <>
      <DefaultLayout title={siteConfig.title}>
        {children}
        <section className="section border-t border-border mt-10">
          <div className="text-sm mt-8 mb-3 text-gray-400">Recent Posts</div>
          <div className="posts">
            {pages
              .filter((page) => page.layout === 'post')
              .map((page) => {
                return (
                  <div key={page.slug} className="box post">
                    <Link href={page.permalink}>
                      <a className="text-link hover:underline">
                        <h2>{page.title}</h2>
                      </a>
                    </Link>
                  </div>
                )
              })}
          </div>
        </section>
      </DefaultLayout>
    </>
  )
}
