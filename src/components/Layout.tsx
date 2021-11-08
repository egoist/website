export const Layout = ({ frontmatter, ...props }) => {
  const LayoutComponent = require(`../layouts/${frontmatter.layout}`).default
  return <LayoutComponent {...props} frontmatter={frontmatter} />
}
