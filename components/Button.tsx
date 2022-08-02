import clsx from "clsx"
import React from "react"

export const Button = ({
  children,
  variant,
  ...props
}: {
  children: React.ReactNode
  variant?: "primary"
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      {...props}
      className={clsx(props.className, `button`, variant && `is-${variant}`)}
    >
      {children}
    </button>
  )
}
