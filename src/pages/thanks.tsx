import _ from 'lodash'
import { GetStaticProps } from 'next'
import DefaultLayout from '../layouts/default'
import Image from 'next/image'
import siteConfig from '$siteConfig'
import thanksGif from '../assets/images/thanks.gif'
import { Sponsors } from '../components/Sponsors'

const fetchSponsors = async () => {
  const data = await fetch(`https://api.github.com/graphql`, {
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    method: 'POST',
    body: JSON.stringify({
      query: `query { 
        viewer { 
          sponsorshipsAsMaintainer (first: 100) {
            nodes {
              tier {
                monthlyPriceInDollars
              }
              sponsorEntity {
                ... on User {
                  login
                  avatarUrl
                  bio
                }
                ... on Organization {
                  login
                  avatarUrl
                  description
                }
              }
            }
          }
        }
      }`,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((res) => {
      if (res.errors) {
        throw new Error(res.errors[0].message)
      }
      return res.data.viewer.sponsorshipsAsMaintainer.nodes
    })
  return data
}

type Props = {
  groupedSponsors: Array<{
    tier: number
    sponsors: Array<{
      login: string
      avatarUrl: string
      bio?: string
      description?: string
    }>
  }>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sponsors = process.env.GITHUB_TOKEN ? await fetchSponsors() : []
  let groupedSponsors = _.groupBy(sponsors, 'tier.monthlyPriceInDollars')
  groupedSponsors = Object.keys(groupedSponsors)
    .map((v) => Number(v))
    .sort((a, b) => (a > b ? -1 : 1))
    .map((key) => {
      return {
        tier: key,
        sponsors: groupedSponsors[key].map((item) => item.sponsorEntity),
      }
    }, {})
  return {
    props: {
      groupedSponsors,
    },
  }
}

export default function ({ groupedSponsors }: Props) {
  return (
    <DefaultLayout
      title={`Supporters - ${siteConfig.title}`}
      description="Help me become a full-time open-source maintainer"
    >
      <h1 className="page-title">Thanks!</h1>
      <p className="my-5">
        I’m truly grateful to all the wonderful humans and companies supporting
        my open source work on{' '}
        <a
          target="_blank"
          rel="nofollow noopener"
          className="text-link hover:underline"
          href="https://github.com/sponsors/egoist"
        >
          GitHub Sponsors
        </a>
        .
      </p>
      <p className="my-5">
        <Image src={thanksGif} />
      </p>
      {groupedSponsors.map((group) => {
        return (
          <Sponsors
            key={group.tier}
            sponsors={group.sponsors}
            tier={group.tier}
          />
        )
      })}
    </DefaultLayout>
  )
}
