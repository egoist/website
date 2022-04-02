import { useEffect, useState } from "react"

export const useMediaQuery = (mq: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mq)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaQueryList.addEventListener("change", listener)
    return () => mediaQueryList.removeEventListener("change", listener)
  }, [mq])

  return matches
}
