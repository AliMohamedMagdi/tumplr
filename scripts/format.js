'use strict'

function insertCommas (num) {
  if (num < 1000) {
    return num
  } else {
    let arr = String(num).split('').reverse()
    for (let i = 3; i < arr.length; i += 4) {
      arr.splice(i, 0, ',')
    }
    return arr.reverse().join('')
  }
}

export { insertCommas }
