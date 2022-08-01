import { PageLayout } from "~/components/PageLayout"
import { site } from "~/config"
import { renderMarkdown } from "~/lib/markdown"

const content = `

I'm a full-stack engineer who loves to build (~~break~~) things.

I've been contributing to Open Source since 2015.

## Email

${site.email}

## Social Media

- [Twitter](https://twitter.com/${site.twitter})
- [GitHub](https://github.com/${site.github})
- [GitHub Sponsors](https://github.com/sponsors/${site.github})
- [Youtube Channel](https://www.youtube.com/channel/UCKhaJ86HV7zsklPaCRxD_4A)
- [Telegram](https://t.me/${site.telegram})

`

export const getStaticProps = async () => {
  const html = await renderMarkdown(content)
  return {
    props: {
      html,
    },
  }
}

export default function AboutPage({ html }: { html: string }) {
  return (
    <PageLayout page={{ type: "page", title: "About", contentHTML: html }} />
  )
}
