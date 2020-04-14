---
layout: default
title: Thanks!
wrap: true
---

I’m truly grateful to all the wonderful humans and companies supporting my open source work on __[GitHub Sponsors](https://github.com/sponsors/egoist)__ and [Patreon (deprecated)](https://patreon.com/egoist).

<img src="@/assets/images/thanks.gif" />

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🔥 Announcement: I will work on open source (mainly Ream &amp; Saber) for full-time when I have 150+ sponsors on GitHub! Shout out to all my existing sponsors (<a href="https://t.co/M9ZigUTPBF">https://t.co/M9ZigUTPBF</a>), the goal is 12% complete!<a href="https://t.co/zASbo1gyaU">https://t.co/zASbo1gyaU</a></p>&mdash; Social distanced EGÖlST (@_egoistlily) <a href="https://twitter.com/_egoistlily/status/1250084073831198720?ref_src=twsrc%5Etfw">April 14, 2020</a></blockquote> <component is="script" async src="https://platform.twitter.com/widgets.js" charset="utf-8"></component> 

<Sponsors
  v-for="group in $page.groupedSponsors"
  :key="group.tier"
  :sponsors="group.sponsors"
  :tier="group.tier"
 >
 </Sponsors>

 <script>
import Sponsors from '../components/Sponsors.vue'

export default {
  components: {
    Sponsors
  },
}
 </script>