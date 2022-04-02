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
      <div className="container py-8">
        <h1 className="">
          <UniLink href="/" className="text-2xl font-medium text-brand">
            <span className="font-mono">{"$"}</span>{" "}
            <span className="font-mono">{site.headerTitle || site.title}</span>{" "}
            <Blink value="_" />
          </UniLink>
        </h1>
        <ul className="flex space-x-6 mt-6 text-lg text-zinc-500">
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
