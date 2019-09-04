<template>
  <form class="form" name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
    <div class="hidden">
      <label>Don’t fill this out if you're human:</label>
      <input name="bot-field" />
    </div>
    <div class="form-group">
      <label for="email">
        Email:
      </label>
      <input class="input is-block" id="email" type="text" name="email" required />
    </div>
    <div class="form-group">
      <label for="subject">Subject:</label>
      <input class="input is-block" id="subject" type="text" name="subject" required />
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea class="textarea is-block" id="message" name="message" rows="5" required></textarea>
    </div>
    <div>
      <button class="button is-block" type="submit">Send</button>
    </div>
  </form>
</template>

<script>
export default {}

export const data = {
  layout: 'default',
  title: 'Contact'
}
</script>