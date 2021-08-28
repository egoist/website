<template>
  <nav class="nav">
    <h1>
      <a href="/">{{ $siteConfig.title }}</a>
    </h1>
    <ul class="menu">
      <li>
        <a href="/projects">Projects</a>
      </li>
      <li>
        <a href="/thanks">Supporters</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  padding-bottom: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed var(--border-color);
  position: sticky;
  top: 0;
  background-color: var(--bg);
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
}

li {
  &:not(:first-child) {
    margin-left: 20px;
  }
}

a {
  display: block;
  color: var(--nav-link-color);
}

.menu {
  & a {
    &.router-link-exact-active {
      color: var(--nav-link-active-color);
    }
  }
}
</style>
