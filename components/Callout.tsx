import clsx from "clsx"
import React from "react"

export const Callout: React.FC<
  { children: React.ReactNode } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div {...props} className={clsx("prose callout", props.className)}>
      {children}
    </div>
  )
}
