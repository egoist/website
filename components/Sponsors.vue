<template>
  <div class="group">
    <div class="group-title">${{ tier }} / month</div>
    <div class="group-body">
      <div
        v-for="sponsor in sponsors"
        :key="sponsor.sponsorEntity.name"
        class="group-item"
      >
        <span v-if="sponsor.sponsorEntity.avatarUrl" class="sponsor-avatar"
          ><img :src="sponsor.sponsorEntity.avatarUrl" height="60" width="60"
        /></span>
        <div>
          <a :href="`https://github.com/${sponsor.sponsorEntity.login}`"
            >{{ sponsor.sponsorEntity.name || sponsor.sponsorEntity.login }}
            <span class="sponsor-login" v-if="sponsor.sponsorEntity.name"
              >({{ sponsor.sponsorEntity.login }})</span
            ></a
          >
          <div
            class="sponsor-description"
            v-if="
              sponsor.sponsorEntity.bio || sponsor.sponsorEntity.description
            "
          >
            {{ sponsor.sponsorEntity.bio || sponsor.sponsorEntity.description }}
          </div>
        </div>
      </div>
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
