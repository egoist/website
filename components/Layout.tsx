import Head from "next/head"
import clsx from "clsx"
import { useRouter } from "next/router"
import { UniLink } from "./UniLink"
import { site } from "~/config"
import { Blink } from "./Blink"

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

export const Layout: React.FC<{ title?: string; description?: string }> = ({
  children,
  title,
  description,
}) => {
  const router = useRouter()
  const documentTitle = title ? `${title} - ${site.title}` : site.title
  return (
    <>
      <Head>
        <title>{documentTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="_egoistlily" />
        <meta name="twitter:title" content={documentTitle} />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
      </Head>
      <header className="">
        <div className="container py-8">
          <h1 className="">
            <UniLink href="/" className="text-2xl font-medium text-pink-500">
              <span className="font-mono">{"$"}</span>{" "}
              <span className="font-mono">
                {site.headerTitle || site.title}
              </span>{" "}
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
                    className={clsx(active && `text-black`, `hover:underline`)}
                  >
                    {link.text}
                  </UniLink>
                </li>
              )
            })}
          </ul>
        </div>
      </header>
      <div className="container py-16">{children}</div>
      <footer className="py-10 text-zinc-500 italic">
        <div className="container">
          <div>
            Made by{" "}
            <UniLink href="/" className="hover:text-pink-500">
              EGOIST
            </UniLink>{" "}
            -{" "}
            <UniLink
              href="https://github.com/egoist/website"
              className="hover:text-pink-500"
            >
              Built with Next.js
            </UniLink>
          </div>
        </div>
      </footer>
    </>
  )
}
