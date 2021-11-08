import Link from 'next/link'
import siteConfig from '$siteConfig'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export const Nav = () => {
  const router = useRouter()
  const links = [
    {
      href: '/thanks',
      text: 'Supporters',
    },
  ]
  return (
    <>
      <nav className="nav mb-8 border-b border-border">
        <div className="container">
          <div className="flex justify-between h-12 items-center">
            <h1>
              <Link href="/">
                <a className="hover:text-white">{siteConfig.title}</a>
              </Link>
            </h1>
            <ul className="text-sm h-full">
              {links.map((link) => {
                const isActive = router.asPath === link.href
                return (
                  <li key={link.text} className="h-full">
                    <Link href={link.href}>
                      <a
                        className={clsx(
                          `flex items-center h-full border-b-2 border-transparent`,
                          isActive
                            ? `border-yellow-500 cursor-default`
                            : `hover:text-white`
                        )}
                      >
                        {link.text}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
