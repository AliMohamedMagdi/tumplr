
function nonce () {
  var text = ''
  var bank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 16; i++) {
    text += bank.charAt(Math.floor(Math.random() * bank.length))
  }
  return text
}

export { nonce }
