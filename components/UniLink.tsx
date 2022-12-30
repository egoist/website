import Link from "next/link"
import React, { useMemo } from "react"

type Props = { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const UniLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, ...props }, ref) => {
    const isMailto = useMemo(() => href.startsWith("mailto:"), [href])
    const isExternal = useMemo(() => /^https?\:\/\//.test(href), [href])

    if (isExternal || isMailto) {
      return (
        <a
          rel="nofollow noopenner"
          ref={ref}
          target="_blank"
          {...props}
          href={href}
        >
          {children}
        </a>
      )
    }

    return (
      <Link {...props} href={href} ref={ref}>
        {children}
      </Link>
    )
  }
)
