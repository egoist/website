import Markdoc, { Config, Schema } from "@markdoc/markdoc"
import Prism from "prismjs"
import { site } from "~/config"

import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-yaml'

export const renderMarkdown = (content: string) => {
    const tokenizer = new Markdoc.Tokenizer({
        linkify: true
    })
    const ast = Markdoc.parse(tokenizer.tokenize(content))
    ast.attributes.class = "prose text-lg"

    const linkTag: Schema = {
        render: "UniLink",
        attributes: {
            href: {
                type: String,
            },
        },
    }
    const fenceTag: Schema = {
        attributes: {
            language: {
                type: String,
            },
            content: {
                type: String,
            },
        },
        transform(node) {
            const language = node.attributes.language || "markup"
            const grammer = Prism.languages[language] || Prism.languages.markup
            const code = Prism.highlight(node.attributes.content, grammer, language)
            return new Markdoc.Tag(
                "CodeBlock",
                {
                    code,
                    language,
                },
                []
            )
        },
    }
    const calloutTag: Schema = {
        render: "Callout",
    }

    const tableTag: Schema = {
        render: "Table",
    }

    const config: Config = {
        nodes: {
            link: linkTag,
            fence: fenceTag,
            table: tableTag,
        },
        tags: {
            span: {
                render: "span",
            },
            div: {
                render: "div",
            },
            link: linkTag,
            callout: calloutTag,
        },
        variables: {
            site,
        },
        functions: {
            join: {
                transform(parameters, config) {
                    return parameters[0].join(parameters[1] || "")
                },
            },
        },
    }
    const errors = Markdoc.validate(ast, config)


    if (errors.length > 0) {
        return {
            errors
        }
    }

    return {
        node: Markdoc.transform(ast, config)
    }
}