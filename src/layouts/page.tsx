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
            <div className="post-date">{frontmatter.dateFormatted}</div>
          )}
          <div className="page-content">{children}</div>
          <section className="comments" ref={commentsSection}></section>
        </main>
      </DefaultLayout>
      <style jsx>{`
        .post-date {
          font-weight: 500;
          font-size: 0.875rem;
          font-style: italic;
          color: var(--secondary-fg);
        }
        .page-content {
          padding: 20px 0;
        }
        .comments {
          margin-top: 50px;
          padding-top: 50px;
          border-top: 1px dashed var(--border-color);
        }
      `}</style>
    </>
  )
}
