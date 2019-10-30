<template>
  <header class="header">
    <h1 class="site-title">
      <a href="/">
        EGOIST
      </a>
    </h1>
  </header>
</template>

<style scoped>
.header {
  margin-bottom: 40px;
}

.site-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  width: 100%;
  line-height: 1;

  & a {
    text-decoration: none;
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