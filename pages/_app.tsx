import "../css/tailwind.css"
import "../css/page.css"
import { Provider as UrqlProvider } from "urql"
import { useUrqlClient } from "~/lib/urql-client"

const App = ({ Component, pageProps }: any) => {
  const urqlClient = useUrqlClient()
  return (
    <UrqlProvider value={urqlClient}>
      <Component {...pageProps} />
    </UrqlProvider>
  )
}

export default App
