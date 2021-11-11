<script setup lang="ts">
defineProps({
  tier: null,
  sponsors: null,
})

const normalizeNewLine = (v: string) => v.replace(/\r\n/g, '\n')
</script>

<template>
  <div class="group">
    <div class="group-title">${{ tier }} / month</div>
    <div class="group-body">
      <div class="group-item" v-for="sponsor in sponsors" :key="sponsor.login">
        <span v-if="sponsor.avatarUrl" class="sponsor-avatar">
          <img :src="sponsor.avatarUrl" height="60" width="60" />
        </span>
        <div>
          <a :href="`https://github.com/${sponsor.login}`">
            {{ sponsor.name || sponsor.login }}
            <span v-if="sponsor.name" class="sponsor-login"
              >({{ sponsor.login }})</span
            >
          </a>
          <div
            v-if="sponsor.bio || sponsor.description"
            class="sponsor-description"
          >
            {{ normalizeNewLine(sponsor.bio || sponsor.description) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
.group-body {
  border: 1px solid var(--border-color);
}
.group-item {
  padding: 10px;
  display: flex;
  align-items: center;
}
.group-item + .group-item {
  border-top: 1px solid var(--border-color);
}
.sponsor-avatar {
  margin-right: 12px;
  flex-shrink: 0;
}
.sponsor-description {
  color: var(--secondary-fg);
  font-size: 0.85rem;
}
</style>
