---
layout: default
title: Thanks!
wrap: true
---

I’m truly grateful to all the wonderful humans and companies supporting my open source work on __[GitHub Sponsors](https://github.com/sponsors/egoist)__ and [Patreon (deprecated)](https://patreon.com/egoist).

<img src="@/assets/images/thanks.gif" />

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
