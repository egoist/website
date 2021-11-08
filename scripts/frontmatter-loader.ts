import { LoaderDefinitionFunction } from 'webpack'
import devalue from 'devalue'
import { parseContent } from './build-pages'

const loader: LoaderDefinitionFunction = async function (source) {
  const parsed = await parseContent(this.resourcePath, source)
  return `export var frontmatter = ${devalue(parsed.frontmatter)};
${parsed.content}`
}

export default loader
