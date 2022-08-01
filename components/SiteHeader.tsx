import clsx from "clsx"
import { useRouter } from "next/router"
import { site } from "~/config"
import Image from "next/image"
import { UniLink } from "./UniLink"
import avatar from "~/assets/avatar.png"
import { Button } from "./Button"

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

export const SiteHeader = () => {
  const router = useRouter()

  return (
    <header className="bg-header relative">
      <div className="container py-10 text-center">
        <h1 className="">
          <UniLink href="/" className="text-2xl font-bold">
            <span
              className="inline-block mx-auto bg-zinc-200 rounded-full w-14 h-14 bg-cover bg-center"
              style={{ backgroundImage: `url("${avatar.src}")` }}
            ></span>
            <div className="mt-1">{site.headerTitle || site.title}</div>
          </UniLink>
        </h1>
        <div className="mt-8 space-x-5 flex items-center justify-center">
          {navLinks.map((link) => {
            const active = router.asPath === link.href
            return (
              <UniLink
                href={link.href}
                key={link.text}
                className={clsx(
                  `border-b-4 font-medium`,
                  active
                    ? `border-primary text-primary`
                    : `border-transparent hover:opacity-50`
                )}
              >
                {link.text}
              </UniLink>
            )
          })}
        </div>
      </div>
    </header>
  )
}
