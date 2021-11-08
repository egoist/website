import Link from 'next/link'
import CodeBlock from '../components/CodeBlock'

export const useComponents = (Component) => {
  if (!Component.isMDXComponent) return {}

  const Wrapper = Component.frontmatter.layout
    ? require(`../layouts/${Component.frontmatter.layout}`).default
    : undefined

  return {
    wrapper: Wrapper,
    pre: (props) => <div {...props} className="my-5" />,
    p: (props) => <p {...props} className="my-5" />,
    code: CodeBlock,
    h2: (props) => <h1 {...props} className="my-5 text-2xl text-gray-100" />,
    ul: (props) => <ul {...props} className="my-5 list-disc pl-5" />,
    ol: (props) => <ol {...props} className="my-5 list-decimal pl-5" />,
    a: ({ href, ...props }) => {
      const isExternal = /^https?:\/\//.test(href) || /^mailto:/.test(href)

      const className = `text-link hover:underline`

      if (isExternal) {
        return (
          <a
            {...props}
            className={className}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          />
        )
      }
      return (
        <Link href={href}>
          <a className={className} {...props} />
        </Link>
      )
    },
  }
}
