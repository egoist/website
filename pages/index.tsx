import { Layout } from "~/components/Layout"
import { UniLink } from "~/components/UniLink"

function Home() {
  return (
    <Layout>
      <div className="prose text-xl">
        <p className="text-4xl">👋</p>
        <p>
          Hi, I'm Kevin, a full-time open-source developer. I use TypeScript
          most of the time, but I'm also interested in Swift and Go.
        </p>
        <p>
          My open-source work is funded by the community via{" "}
          <UniLink href="https://github.com/sponsors/egoist">
            GitHub Sponsors
          </UniLink>
          , if you use my code, please consider supporting me financially to
          help me keep doing what I love!
        </p>
        <p>Have a nice day!</p>
      </div>
    </Layout>
  )
}

export default Home
