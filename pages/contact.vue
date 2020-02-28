<template>
  <div v-if="successMessage" class="success-message">{{successMessage}}</div>
  <div v-else-if="errorMessage" class="error-message">{{errorMessage}}</div>
  <form v-else class="form" @submit.prevent="handleSubmit">
    <div class="hidden">
      <label>Don’t fill this out if you're human:</label>
      <input type="text" name="frqtrw5" />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input class="input is-block" id="email" type="text" name="email" required v-model="email" />
    </div>
    <div class="form-group">
      <label for="subject">Subject:</label>
      <input
        class="input is-block"
        id="subject"
        type="text"
        name="subject"
        required
        v-model="subject"
      />
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea
        class="textarea is-block"
        id="message"
        name="message"
        rows="5"
        required
        v-model="message"
      ></textarea>
    </div>
    <div>
      <button class="button is-block" :disabled="sending" type="submit">
        {{ sending ? 'Sending' : 'Send' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      subject: '',
      email: '',
      sending: false,
      successMessage: '',
      errorMessage: ''
    }
  },

  methods: {
    async handleSubmit() {
      this.sending = true
      this.successMessage = ''
      this.errorMessage = ''
      const res = await fetch(`https://api.formsimple.io/frqtrw5`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          message: this.message,
          subject: this.subject,
          email: this.email
        })
      })
      this.sending = false
      if (res.ok) {
        this.successMessage = `Thank you, I will reply as soon as possible!`
      } else {
        this.errorMessage = await res.json().then(res => res.message)
      }
    }
  }
}

export const data = {
  layout: 'default',
  title: 'Contact',
  wrap: true
}
</script>


<style scoped>
.success-message,
.error-message {
  padding: 20px;
  text-align: center;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>