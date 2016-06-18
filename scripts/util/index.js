'use strict'

function nonce () {
  var text = ''
  var bank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 16; i++) {
    text += bank.charAt(Math.floor(Math.random() * bank.length))
  }
  return text
}

function hex2rgba (hexColor, opacity) {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, 0.8)`
}

export { nonce, hex2rgba }
