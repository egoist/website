---
title: Supporters
layout: page
---

I’m truly grateful to all the wonderful humans and companies supporting
my open source work on [GitHub Sponsors](https://github.com/sponsors/egoist).

<img src="../assets/images/thanks.gif" width="550" height="250" alt="thanks in multiple languages" />

<Sponsors v-for="group in $page.groupedSponsors" :tier="group.tier" :sponsors="group.sponsors" />

<script setup>
import Sponsors from '$src/components/Sponsors.vue'
</script>
