import Markdoc, { RenderableTreeNode } from "@markdoc/markdoc"
import React from "react"
import { Callout } from "./Callout"
import { CodeBlock } from "./CodeBlock"
import { Table } from "./Table"
import { UniLink } from "./UniLink"

const components = {
    UniLink,
    CodeBlock,
    Callout,
    Table,
}

export const MarkdocContent: React.FC<{ content: RenderableTreeNode }> = ({
    content,
}) => {
    const node = Markdoc.renderers.react(content, React, { components })
    return node as any
}
