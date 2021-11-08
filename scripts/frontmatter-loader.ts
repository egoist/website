import { LoaderDefinitionFunction } from 'webpack'
import devalue from 'devalue'
import { parseContent } from './build-pages'

const loader: LoaderDefinitionFunction = async function (source) {
  const { type } = this.query as { type: string }
  if (type === 'pre') {
    const parsed = await parseContent(this.resourcePath, source)
    return `export var frontmatter = ${devalue(parsed.frontmatter)};
${parsed.content}`
  }
  return source + `\nMDXContent.frontmatter=frontmatter`
}

export default loader
