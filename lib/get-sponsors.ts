import { groupBy } from "lodash-es"

const token = process.env.GITHUB_TOKEN

const fetchSponsors = async () => {
  const data = await fetch(`https://api.github.com/graphql`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
    method: "POST",
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
    .then((res) => res.json())
    .then((res) => {
      return res.data.viewer.sponsorshipsAsMaintainer.nodes
    })
  return data
}

export const getSponsors = async () => {
  const sponsors = token ? await fetchSponsors() : []
  let groupedSponsors = groupBy(sponsors, "tier.monthlyPriceInDollars")
  groupedSponsors = Object.keys(groupedSponsors)
    .map((v) => Number(v))
    .sort((a, b) => (a > b ? -1 : 1))
    .map((key) => {
      return {
        tier: key,
        sponsors: groupedSponsors[key].map((item) => item.sponsorEntity),
      }
    }, {})
  return groupedSponsors
}
