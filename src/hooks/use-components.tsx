import Link from 'next/link'
import CodeBlock from '../components/CodeBlock'

export const useComponents = (Component) => {
  if (!Component.isMDXComponent) return {}

  const Wrapper = Component.frontmatter.layout
    ? require(`../layouts/${Component.frontmatter.layout}`).default
    : undefined

  return {
    wrapper: Wrapper,
    pre: (props) => <div {...props} />,
    code: CodeBlock,
    h2: (props) => <h1 {...props} className="text-2xl text-gray-100" />,
    ul: (props) => <ul {...props} className="list-disc pl-5" />,
    ol: (props) => <ol {...props} className="list-decimal pl-5" />,
    a: ({ href, ...props }) => {
      const isExternal = /^https?:\/\//.test(href) || /^mailto:/.test(href)
      if (isExternal) {
        return (
          <a {...props} href={href} target="_blank" rel="noopener noreferrer" />
        )
      }
      return (
        <Link href={href}>
          <a {...props} />
        </Link>
      )
    },
  }
}
