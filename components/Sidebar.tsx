import clsx from "clsx"
import { useRouter } from "next/router"
import { site } from "~/config"
import { UniLink } from "./UniLink"
import avatar from "~/assets/avatar.png"
import { useState } from "react"

const navLinks = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Supporters",
    href: "/thanks",
  },
]

export const Sidebar = () => {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="bg-zinc-50 border-r md:fixed md:w-sidebar left-0 top-0 bottom-0">
      <header className="flex md:block justify-between items-center border-b">
        <UniLink
          href="/"
          className="flex space-x-3 items-center h-16 px-5 hover:bg-zinc-100 "
        >
          <span
            className="inline-block rounded-md w-10 h-10 bg-cover bg-center"
            style={{ backgroundImage: `url("${avatar.src}")` }}
          ></span>
          <div className="text-xl font-medium">
            {site.headerTitle || site.title}
          </div>
        </UniLink>
        <button
          type="button"
          className="md:hidden px-5 h-16 text-2xl"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6L6 18M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </header>
      <div
        className={clsx(
          "py-6 md:block border-b border-zinc-200 md:border-0",
          showMenu ? "" : "hidden"
        )}
      >
        <div className="px-3 space-y-[1px]">
          {navLinks.map((link) => {
            const active = router.asPath === link.href
            return (
              <UniLink
                href={link.href}
                key={link.text}
                className={clsx(
                  `flex w-full rounded-md px-2 h-8 items-center text-sm transition-colors`,
                  active ? `bg-zinc-200 ` : `hover:bg-zinc-100`
                )}
              >
                {link.text}
              </UniLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
