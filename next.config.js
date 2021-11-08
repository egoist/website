const path = require('path')

require('sucrase/register')

let buildPagesPromise

module.exports = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  webpack(config, options) {
    // Replace React with Preact in client production build
    if (!options.dev && !options.isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: require.resolve('@mdx-js/loader'),
          options: {},
        },
        {
          loader: require.resolve('./scripts/frontmatter-loader'),
        },
      ],
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      $pages: path.resolve('./.cache/pages.js'),
    }

    class PagesPlugin {
      /**
       * @param {import('webpack').Compiler} compiler
       */
      apply(compiler) {
        const run = async () => {
          if (!buildPagesPromise) {
            buildPagesPromise = require('./scripts/build-pages').buildPages({
              watch: options.dev,
            })
          }
          await buildPagesPromise
        }
        compiler.hooks.beforeRun.tapPromise('pages', run)
        compiler.hooks.watchRun.tapPromise('pages', run)
      }
    }
    config.plugins.push(new PagesPlugin())

    return config
  },
}
