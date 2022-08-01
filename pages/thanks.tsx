import Image from "next/image"
import { Layout } from "~/components/Layout"
import { UniLink } from "~/components/UniLink"
import { getSponsors } from "~/lib/get-sponsors"
import { GetStaticProps } from "next"

export const getStaticProps: GetStaticProps = async () => {
  const sponsors = await getSponsors()

  return {
    props: {
      sponsors,
    },
    revalidate: 86400,
  }
}

const normalizeNewLine = (v: string) => v.replace(/\r\n/g, "\n")

export default function ThanksPage({ sponsors }: { sponsors: any[] }) {
  return (
    <Layout title="Thanks">
      <h2 className="page-title">
        <span>Supporters</span>
      </h2>
      <div className="prose my-5">
        <p>
          I’m truly grateful to all the wonderful humans and companies
          supporting my open source work on{" "}
          <UniLink href="https://github.com/sponsors/egoist">
            GitHub Sponsors
          </UniLink>
        </p>
        <p>
          <Image
            src={"/assets/thanks.gif"}
            width="550"
            height="250"
            alt="thanks in multiple languages"
          />
        </p>
      </div>

      <div className="space-y-8">
        {sponsors.map(({ tier, sponsors }) => {
          return (
            <div key={tier}>
              <h3 className="text-2xl mb-2">${tier}/month</h3>
              <div className="border dark:border-zinc-800 divide-y dark:divide-zinc-800">
                {sponsors.map((sponsor: any) => {
                  const bio = sponsor.bio || sponsor.description
                  return (
                    <div
                      key={sponsor.login}
                      className="flex space-x-3 items-center p-3"
                    >
                      <span className="flex-shrink-0">
                        <Image
                          src={sponsor.avatarUrl}
                          height={60}
                          width={60}
                          alt={`profile image of ${sponsor.login}`}
                        />
                      </span>
                      <div>
                        <a
                          href={`https://github.com/${sponsor.login}`}
                          rel="nofollow noopener"
                          target="_blank"
                          className="text-lg text-pink-500 hover:underline"
                        >
                          {sponsor.name || sponsor.login}
                          {sponsor.name && <span>({sponsor.login})</span>}
                        </a>
                        {bio && (
                          <div className="text-zinc-500">
                            {normalizeNewLine(bio)}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
