<template>
  <header class="header">
    <h1 class="site-title">
      <a href="/">
        <saber-image :blendIn="false" class="avatar" src="@/assets/images/avatar.jpg" alt="egoist's avatar" />
        <span>EGOIST</span>
      </a>
    </h1>
  </header>
</template>

<style scoped>
.header {
  margin-bottom: 40px;
  text-align: center;
}

.site-title {
  font-size: 2.4rem;
  font-weight: 300;
  margin: 0;
  width: 100%;
  line-height: 1;

  & a {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  width: 41px;
  height: 41px;
  border-radius: 10px;
  margin-right: 10px;
  margin-top: -3px;
}
</style>