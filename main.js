function clickAndUpdate(id, text) {
  const $el = document.getElementById(id)
  $el.addEventListener('click', e => {
    e.target.textContent = text
  })
}

clickAndUpdate('email', '0x142857@' + 'gmail.com')
clickAndUpdate('paypal', 'PayPal (0x142857@' + 'gmail.com)')

function toggleQrCode(selector) {
  const $els = document.querySelectorAll(selector)
  $els.forEach($el => {
    $el.addEventListener('click', () => {
      if ($el.classList.contains('show-code')) {
        $el.classList.remove('show-code')
      } else {
        $el.classList.add('show-code')
      }
    })
    document.addEventListener('click', e => {
      if (!$el.contains(e.target)) {
        $el.classList.remove('show-code')
      }
    })
  })
}

toggleQrCode('.qrcode-wrapper')