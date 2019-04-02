<template>
  <div class="homepage">
    <HomeNavigator/>

    <section id="welcome" class="welcome">
      <div class="card">
        <div class="title">
          <span>EGOIST</span>
        </div>
        <div class="intro">
          I am an indie developer who focuses on JavaScript, Web and Node.js. I created a lot of stuffs and most of them are open source on
          <a
            href="https://github.com/egoist"
            target="_blank"
          >GitHub</a>. Huge thanks to
          <saber-link
            to="#supporters"
            @click.native.prevent="jumpTo('#supporters')"
          >all my amazing supporters</saber-link>&nbsp;for donating to keep me doing what I love!
        </div>
      </div>
    </section>

    <section id="repos" class="section bg-gray-900">
      <div class="container mx-auto">
        <div class="section-inner">
          <div class="section-title">Repos</div>
          <div class="section-content">
            <div class="text-2xl text-gray-300 select-none mb-6">
              My
              <span
                class="border-b border-dotted border-gray-600 cursor-pointer"
                @click="switchRepos"
              >{{ showPinnedRepos ? 'Pinned' : 'Recent' }}</span> Repos on GitHub
            </div>
            <div>
              <div class="mb-3" v-for="repo in repos" :key="repo.name">
                <a
                  class="text-xl text-gray-400 hover:text-gray-200"
                  :href="repo.url"
                  target="_blank"
                >{{ repo.name }}</a>
                <div class="text-gray-600 mt-1">
                  <span
                    class="bg-gray-800 py-1 px-2 text-xs rounded mr-1"
                    v-if="repo.primaryLanguage"
                  >{{ repo.primaryLanguage.name }}</span>
                  {{ repo.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="supporters" class="section bg-purple-600">
      <div class="container mx-auto">
        <div class="section-inner">
          <div class="section-title">Supporters</div>
          <div class="section-content">
            <div class="text-2xl text-gray-100 select-none mb-6">
              My
              <span
                class="border-b border-dotted border-purple-300 cursor-pointer"
                @click="switchSupporters"
              >{{ showPreviousSupporters ? 'Previous' : 'Current' }}</span> Supporters
            </div>
            <ul class="list-disc list-inside">
              <li class="mb-1" v-for="people in supporters" :key="people.name">
                <a
                  class="text-xl text-gray-100 hover:text-gray-400"
                  :href="people.link"
                  target="_blank"
                >{{ people.name }}</a>
              </li>
            </ul>
            <div
              class="mt-5 md:w-2/3 shadow text-sm text-gray-100 inline-block py-3 px-5 rounded hover:shadow-lg"
            >
              <div
                class="mb-3"
                v-if="showPreviousSupporters"
              >I’m forever thankful to these people that have previously supported me.</div>
              <div
                class="mb-3"
                v-else
              >I’m truly grateful to all the wonderful humans supporting my open source work.</div>
              <div class="mb-3">You can also support me via following methods:</div>
              <ul class="text-sm">
                <li v-for="link in donationLinks" :key="link.text">
                  <a
                    class="text-gray-100 hover:text-gray-400"
                    :href="link.link"
                    target="_blank"
                  >{{ link.text }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="links" class="section bg-blue-400">
      <div class="container mx-auto">
        <div class="section-inner">
          <div class="section-title">Links</div>
          <div class="section-content">
            <div class="mb-2" v-for="link in links" :key="link.link">
              <a
                class="inline-flex items-center text-xl text-gray-100 hover:text-gray-300"
                :href="link.link"
                :target="/^mailto:/.test(link.link) ? '_self' : '_blank'"
              >
                <component :is="link.icon" class="mr-2 w-5 h-5"/>
                {{ link.text }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  TwitterIcon,
  MusicIcon,
  GithubIcon,
  SmileIcon,
  HeartIcon,
  MessageSquareIcon,
  MailIcon
} from 'vue-feather-icons'
import inView from 'in-view'
import { jumpTo } from '../utils'
import HomeNavigator from '../components/HomeNavigator.vue'

export default {
  components: {
    TwitterIcon,
    MusicIcon,
    GithubIcon,
    SmileIcon,
    HeartIcon,
    MessageSquareIcon,
    MailIcon,
    HomeNavigator
  },

  props: ['page'],

  head: {
    title: 'EGOIST'
  },

  data() {
    return {
      showPinnedRepos: false,
      showPreviousSupporters: false,
      links: [
        {
          icon: 'TwitterIcon',
          link: 'https://twitter.com/_egoistlily',
          text: 'Follow Me on Twitter'
        },
        {
          icon: 'GithubIcon',
          link: 'https://github.com/egoist',
          text: 'My GitHub Profile'
        },
        {
          icon: 'MusicIcon',
          link: 'https://music.163.com/#/playlist?id=10657036',
          text: 'The Songs I Love'
        },
        {
          icon: 'SmileIcon',
          link: 'https://anilist.co/user/egoistlily/',
          text: 'My Anime & Manga List'
        },
        {
          icon: 'MessageSquareIcon',
          link: 'https://discord.gg/KFrDE8Z',
          text: 'My Discord Chat'
        },
        {
          icon: 'MailIcon',
          link: 'mailto:0x142857@gmail.com',
          text: 'Shot Me an Email'
        }
      ],
      currentSupporters: [
        {
          name: 'HANATANI Takuma (potato4d)',
          link: 'https://github.com/potato4d'
        },
        {
          name: 'Shinya Katayama (ktsn)',
          link: 'https://github.com/ktsn'
        },
        {
          name: 'Wrathagom',
          link: 'https://github.com/wrathagom'
        },
        {
          name: 'Amor',
          link: 'https://github.com/amorist'
        }
      ],
      previousSupporters: [
        {
          name: 'Nicolai Moraru',
          link: 'https://github.com/nickmessing'
        },
        {
          name: 'John Lindquist',
          link: 'https://github.com/johnlindquist'
        }
      ],
      donationLinks: [
        {
          text: 'Monthly Payments on Patreon',
          link: 'https://www.patreon.com/egoist'
        },
        {
          text: 'PayPal',
          link: 'https://www.paypal.me/egoistian'
        },
        {
          text: 'Wechat (微信)',
          link:
            'http://ww4.sinaimg.cn/large/a15b4afegw1f72ib6rj67j20u00tvgnj.jpg'
        },
        {
          text: 'AliPay (支付宝)',
          link: 'https://i.loli.net/2017/09/04/59ace6025d653.jpg'
        }
      ]
    }
  },

  methods: {
    switchRepos() {
      this.showPinnedRepos = !this.showPinnedRepos
    },

    switchSupporters() {
      this.showPreviousSupporters = !this.showPreviousSupporters
    },

    jumpTo
  },

  computed: {
    repos() {
      return this.showPinnedRepos
        ? this.page.pinnedRepos
        : this.page.recentRepos
    },

    supporters() {
      return this.showPreviousSupporters
        ? this.previousSupporters
        : this.currentSupporters
    }
  },

  mounted() {
    this.jumpTo(this.$route.hash)

    inView.threshold(0.5)
    inView('.homepage section').on('enter', el => {
      this.$store.homeSection = el.id
    })
  }
}
</script>


<style scoped>
section.welcome {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section {
  @apply px-5 py-20 text-gray-200;

  font-family: 'Open Sans', serif;

  @screen md {
    @apply py-56;
  }
}

.section-inner {
  @apply flex flex-col;

  @screen md {
    @apply flex-row;
  }
}

.section-title {
  @apply text-5xl mb-8;

  font-style: italic;
  line-height: 1;

  @screen md {
    font-size: 5rem;
    @apply w-1/2  text-right pr-32;
  }
}

.section-content {
  @screen md {
    @apply w-1/2;
  }
}

.title {
  font-size: 2.4rem;
  font-family: 'Abril Fatface', cursive;
  position: relative;
  text-align: center;

  &:before {
    content: '';
    height: 1px;
    position: absolute;
    background: #ccc;
    width: 100%;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }

  & span {
    background: white;
    position: relative;
    padding: 0 20px;
  }
}

.card {
  @apply text-center w-full px-5;

  @screen md {
    @apply px-1;
    max-width: 23rem;
  }
}

.intro {
  font-size: 1.2rem;
  font-family: 'Open Sans', serif;

  & a {
    color: rgba(22, 146, 90, 0.8);

    &:hover {
      color: rgba(22, 146, 90, 1);
    }
  }
}
</style>
