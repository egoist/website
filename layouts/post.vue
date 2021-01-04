<template>
  <default-layout :page="page">
    <main>
      <h1 class="page-title">{{ page.title }}</h1>
      <div class="post-date">{{ page.formatedDate }}</div>
      <div class="page-content">
        <slot></slot>
      </div>
      <section class="comments" ref="comments"></section>
    </main>
  </default-layout>
</template>

<script>
import DefaultLayout from './default'

export default {
  components: {
    DefaultLayout
  },

  props: ['page'],

  head() {
    const title = this.page.title
      ? `${this.page.title} - ${this.$siteConfig.title}`
      : this.$siteConfig.title
    return {
      title,
      meta: [
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:site',
          content: '@_egoistlily'
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: this.page.excerpt.replace(/(<([^>]+)>)/gi, '')
        }
      ]
    }
  },

  mounted() {
    const attrs = {
      repo: 'egoist/website',
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'preferred-color-scheme',
      crossorigin: 'anonymous'
    }
    const script = (this.$commentScript = document.createElement('script'))
    script.src = `https://utteranc.es/client.js`
    script.async = true
    for (const key of Object.keys(attrs)) {
      script.setAttribute(key, attrs[key])
    }
    this.$refs.comments.append(script)
  },

  beforeDestroy() {
    if (this.$commentScript) {
      this.$commentScript.parentNode.removeChild(this.$commentScript)
    }
  }
}
</script>

<style scoped>
.post-date {
  font-weight: 500;
  font-size: 0.875rem;
  font-style: italic;
  color: var(--secondary-fg);
}

.page-content {
  padding: 20px 0;
}

.comments {
  margin-top: 50px;
  padding-top: 50px;
  border-top: 1px dashed var(--border-color);
}
</style>
