<template>
  <div class="group">
    <div class="group-title">${{ tier }} / month</div>
    <div v-for="sponsor in sponsors" :key="sponsor.sponsor.name">
      <a :href="`https://github.com/${sponsor.sponsor.login}`">{{sponsor.sponsor.name || sponsor.sponsor.login}} <span class="sponsor-login" v-if="sponsor.sponsor.name">({{sponsor.sponsor.login}})</span></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sponsors', 'tier']
}
</script>

<style scoped>
.group {
  margin-top: 50px;
}

.group-title {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.sponsor-login {
  color: #999;
}
</style>