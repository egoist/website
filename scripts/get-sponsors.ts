import axios from 'axios'
import _ from 'lodash'

const token = process.env.VITE_GITHUB_TOKEN

const fetchSponsors = async () => {
  const data = await axios(`https://api.github.com/graphql`, {
    headers: {
      Authorization: `bearer ${process.env.VITE_GITHUB_TOKEN}`,
    },
    method: 'POST',
    data: {
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
    },
  }).then((res) => {
    return res.data.data.viewer.sponsorshipsAsMaintainer.nodes
  })
  return data
}

export const getSponsors = async () => {
  const sponsors = token ? await fetchSponsors() : []
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
  return groupedSponsors
}
