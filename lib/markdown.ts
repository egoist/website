import MarkdownIt from "markdown-it"
import Prism from "prismjs"
import load from "prismjs/components/index"

export const renderMarkdown = async (content: string) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    highlight(code, lang) {
      let language = Prism.languages[lang]
      if (!language) {
        language = Prism.languages.markup
        lang = "markup"
      }
      return Prism.highlight(code, language, lang)
    },
  })
  const html = md.render(content)
  return html
}
