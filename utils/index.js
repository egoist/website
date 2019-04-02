import jump from 'jump.js'

export const jumpTo = hash => {
  const el = hash && document.getElementById(hash.slice(1))
  if (el) {
    jump(el, {
      duration: 0
    })
  }
}