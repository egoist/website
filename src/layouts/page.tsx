import React from 'react'
import siteConfig from '$siteConfig'
import DefaultLayout from './default'

export default function ({ frontmatter, children }) {
  const isPost = frontmatter.layout === 'post'
  const commentsSection = React.useRef<HTMLDivElement | null>(null)

  const initComments = () => {
    if (!commentsSection.current || !isPost) return

    const attrs = {
      repo: 'egoist/website',
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'preferred-color-scheme',
      crossorigin: 'anonymous',
    }
    const script = document.createElement('script')
    script.src = `https://utteranc.es/client.js`
    script.async = true
    for (const key of Object.keys(attrs)) {
      script.setAttribute(key, attrs[key])
    }
    commentsSection.current.append(script)
  }

  React.useEffect(() => {
    initComments()
  }, [])

  return (
    <>
      <DefaultLayout
        title={`${frontmatter.title} - ${siteConfig.title}`}
        description={frontmatter.description}
      >
        <main>
          <h1 className="page-title">{frontmatter.title}</h1>
          {isPost && (
            <div className="text-gray-500 text-sm italic">
              {frontmatter.dateFormatted}
            </div>
          )}
          <div>{children}</div>
          <section
            className="border-t border-border border-dashed mt-20 pt-5"
            ref={commentsSection}
          ></section>
        </main>
      </DefaultLayout>
    </>
  )
}
