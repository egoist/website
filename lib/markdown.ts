import MarkdownIt from "markdown-it"

export const renderMarkdown = async (content: string) => {
  const md = new MarkdownIt({ html: true, linkify: true })
  const html = md.render(content)
  return html
}
