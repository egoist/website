<template>
  <nav class="nav">
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/blog">Blog</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  margin-bottom: 30px;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  text-align: center;
  justify-content: center;
}

li {
  &:not(:first-child) {
    margin-left: 20px;
  }
}

a {
  text-decoration: none;
  color: #999;

  &.router-link-exact-active {
    color: inherit;
  }
}
</style>