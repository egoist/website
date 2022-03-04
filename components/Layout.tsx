import Head from "next/head"
import clsx from "clsx"
import { useRouter } from "next/router"
import { UniLink } from "./UniLink"
import { site } from "~/config"
import logoLight from "~/assets/logo-light.png"
import Image from "next/image"

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
      <header className="border-b border-dotted">
        <div className="max-w-screen-md mx-auto px-5 py-8">
          <h1 className="">
            <UniLink href="/" className="text-5xl italic font-bold">
              <Image
                src={logoLight}
                width={182}
                height={44}
                alt={site.headerTitle || site.title}
              />
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
      <div className="max-w-screen-md mx-auto px-5 py-16">{children}</div>
      <footer className="py-10 text-zinc-500 border-t border-dotted">
        <div className="max-w-screen-md mx-auto px-5">
          <div>
            Made by <UniLink href="/">EGOIST</UniLink> - Built with Next.js
          </div>
        </div>
      </footer>
    </>
  )
}
