---
title: 赞助
layout: page
---

非常感谢所有通过 [GitHub Sponsors](https://github.com/sponsors/egoist) 在经济上支持我的朋友.

<img src="../../assets/images/thanks.gif" width="550" height="250" alt="thanks in multiple languages" />

<Sponsors v-for="group in $page.groupedSponsors" :tier="group.tier" :sponsors="group.sponsors" />

<script setup>
import Sponsors from '$src/components/Sponsors.vue'
</script>
