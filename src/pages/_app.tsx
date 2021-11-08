import '../css/tailwind.css'
import '../css/global.css'
import '../css/page.css'
import { MDXProvider } from '@mdx-js/react'
import { useComponents } from '../hooks/use-components'

function MyApp({ Component, pageProps }: any) {
  const components = useComponents(Component)
  if (Component.isMDXComponent) {
    return (
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    )
  }
  return <Component {...pageProps} />
}

export default MyApp
