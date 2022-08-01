import clsx from "clsx"
import { useRouter } from "next/router"
import { site } from "~/config"
import { Blink } from "./Blink"
import { UniLink } from "./UniLink"

const navLinks = [
  {
    text: "home",
    href: "/",
  },
  {
    text: "about",
    href: "/about",
  },
  {
    text: "supporters",
    href: "/thanks",
  },
]

export const SiteHeader = () => {
  const router = useRouter()

  return (
    <header>
      <div className="container py-10">
        <h1 className="">
          <UniLink
            href="/"
            className="text-5xl font-bold bg-brand text-white px-2 py-1"
          >
            <span className="">{site.headerTitle || site.title}</span>{" "}
          </UniLink>
        </h1>
        <ul className="flex space-x-6 mt-10 text-lg text-zinc-500">
          {navLinks.map((link) => {
            const active = link.href === router.asPath
            return (
              <li key={link.text}>
                <UniLink
                  href={link.href}
                  className={clsx(
                    active && `text-black dark:text-zinc-100`,
                    `hover:underline`
                  )}
                >
                  {link.text}
                </UniLink>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
