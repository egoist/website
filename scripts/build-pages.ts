import path from 'path'
import fs from 'fs'
import glob from 'fast-glob'
import grayMatter from 'gray-matter'
import devalue from 'devalue'
import chokidar from 'chokidar'
import dayjs from 'dayjs'

export async function parseContent(absolutePath: string, content: string) {
  const gm = grayMatter(content)
  const slug = path.basename(absolutePath).replace('.mdx', '')
  const stat = await fs.promises.stat(absolutePath)
  const date = new Date(gm.data.date || stat.birthtime)
  return {
    frontmatter: {
      slug,
      permalink: '/' + slug.replace(/[\/|^]index$/, ''),
      ...gm.data,
      date,
      dateFormatted: dayjs(date).format('MMM DD, YYYY'),
    },
    content: gm.content,
  }
}

export async function buildPages(options: { watch?: boolean }) {
  const build = async () => {
    const files = await glob('**/*.mdx', { cwd: './src/pages' })
    const pages = await Promise.all(
      files.map(async (file) => {
        const absolutePath = path.resolve(`./src/pages/${file}`)
        const content = await fs.promises.readFile(absolutePath, 'utf8')
        const { frontmatter } = await parseContent(absolutePath, content)
        return frontmatter
      })
    ).then((pages) =>
      pages.sort((a, b) => {
        return a.date > b.date ? -1 : 1
      })
    )
    await fs.promises.mkdir('.cache', { recursive: true })
    await fs.promises.writeFile(
      path.resolve('.cache/pages.js'),
      `export default ${devalue(pages)}`,
      'utf8'
    )
  }

  await build()

  if (options.watch) {
    chokidar
      .watch('**/*.mdx', {
        cwd: './src/pages',
        ignoreInitial: true,
        ignorePermissionErrors: true,
      })
      .on('all', () => {
        build()
      })
  }
}
