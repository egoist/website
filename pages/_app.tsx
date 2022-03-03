import "../css/tailwind.css"
import "../css/page.css"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Progress from "@badrap/bar-of-progress"

const App = ({ Component, pageProps }: any) => {
  const router = useRouter()

  useEffect(() => {
    const progress = new Progress({
      className: "text-pink-500",
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
  return <Component {...pageProps} />
}

export default App
