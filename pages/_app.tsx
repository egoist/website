import "../css/tailwind.css"
import "../generated/uno.css"
import "../css/prism.css"
import "../css/page.css"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Progress from "@badrap/bar-of-progress"
import Error from "next/error"

const App = ({ Component, pageProps }: any) => {
  const router = useRouter()

  useEffect(() => {
    const progress = new Progress({
      className: "text-brand",
      color: "",
    })
    const handleRouteStart = () => {
      progress.start()
    }
    const handleRouteFinish = () => {
      progress.finish()
    }

    router.events.on("routeChangeStart", handleRouteStart)
    router.events.on("routeChangeComplete", handleRouteFinish)
    router.events.on("routeChangeError", handleRouteFinish)

    return () => {
      router.events.off("routeChangeStart", handleRouteStart)
      router.events.off("routeChangeComplete", handleRouteFinish)
      router.events.off("routeChangeError", handleRouteFinish)
    }
  }, [])

  if (pageProps.statusCode) {
    return <Error statusCode={pageProps.statusCode} />
  }
  return <Component {...pageProps} />
}

export default App
