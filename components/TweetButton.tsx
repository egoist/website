import { useMemo } from "react"
import { UniLink } from "./UniLink"

export const TweetButton: React.FC<{ url: string; text: string }> = ({
  url,
  text,
}) => {
  const tweetURL = useMemo(
    () =>
      `https://twitter.com/intent/tweet?${new URLSearchParams([
        ["url", url],
        ["text", text],
      ]).toString()}`,
    [url, text]
  )
  return (
    <UniLink
      href={tweetURL}
      className="
    bg-[#1d9bf0]
      text-white
      inline-flex
      items-center
      space-x-2
      rounded-md
      px-3
      text-sm
      py-1
    "
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        shapeRendering="geometricPrecision"
      >
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
      </svg>
      <span>Tweet</span>
    </UniLink>
  )
}
