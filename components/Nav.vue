<template>
  <nav class="nav">
    <ul>
      <li>
        <saber-link to="/">Home</saber-link>
      </li>
      <li>
        <saber-link to="/blog">Blog</saber-link>
      </li>
      <li>
        <saber-link to="/contact">Contact</saber-link>
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