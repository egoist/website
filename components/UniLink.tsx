import Link from "next/link"
import React, { useMemo } from "react"

export const UniLink: React.FC<
  { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ href, children, ...props }) => {
  const isMailto = useMemo(() => href.startsWith("mailto:"), [href])
  const isExternal = useMemo(() => /^https?\:\/\//.test(href), [href])

  if (isExternal || isMailto) {
    return (
      <a rel="nofollow noopenner" target="_blank" {...props} href={href}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  )
}
