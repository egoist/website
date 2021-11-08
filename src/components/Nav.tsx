import Link from 'next/link'
import siteConfig from '$siteConfig'

export const Nav = () => {
  return (
    <>
      <nav className="nav mb-8">
        <div className="container">
          <div className="flex justify-between py-2">
            <h1>
              <Link href="/">
                <a>{siteConfig.title}</a>
              </Link>
            </h1>
            <ul className="menu">
              <li>
                <Link href="/thanks">
                  <a>Supporters</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
        }

        ul {
          display: flex;
          list-style: none;
          padding: 0;
        }

        li:not(:first-child) {
          margin-left: 20px;
        }

        a {
          display: block;
          color: var(--nav-link-color);
        }
      `}</style>
    </>
  )
}
