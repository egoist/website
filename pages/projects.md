---
layout: default
title: Projects
---

Only the online services I made are listed here, for the rest of my projects please head over to [GitHub](https://github.com/egoist).

<div class="projects">
  <div class="project" v-for="project in projects" :key="project.name">
    <div class="project-name">{{ project.name }}</div>
    <div class="project-desc" v-if="project.desc">{{ project.desc }}</div>
    <div class="project-links">
      <a :href="project.url">
        <svg xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> Visit website</a>
      <a :href="`https://github.com/${project.repo}`">
        <svg xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> Source code</a>
    </div>
  </div>
</div>

<script>
import projects from './projects.yml'

export default {
  data() {
    return {
      projects
    }
  }
}
</script>

<style scoped>
.projects {
  margin-left: -20px;
  width: calc(100% + 40px);
  border-bottom: 1px solid var(--border-color);
}

.project {
  background: rgba(0, 0, 0, 0.12);
  padding: 20px;
  border-top: 1px solid var(--border-color);
}

.project-name {
  font-size: 1rem;
}

.project-desc {
  font-size: .7rem;
  font-style: italic;
  color: #969696;
}

.project-links {
  display: flex;
  margin-top: 15px;
  font-size: .6rem;
}

.project-links a {
  border: 1px solid var(--border-color);
  text-decoration: none;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;

  &:hover {
    background: #131313;
  }

  & svg {
    margin-right: 5px;
  }

  &:not(:last-child) {
    margin-right: 15px;
  }
}
</style>
