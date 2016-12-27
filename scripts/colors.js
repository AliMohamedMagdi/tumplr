export default {
  night: '#181818',
  nightshade: '#3a3f41',
  heart: '#e17d74',
  heartlite: '#f4cbc6',
  overcast: '#bddae3',
  overcastnite: '#4c95ad',

  shade: function (hex, percent) {
    const f = parseInt(hex.slice(1), 16)
    const t = percent < 0 ? 0 : 255
    const p = percent < 0 ? (percent * -1) : percent
    const R = f >> 16
    const G = f >> 8 & 0x00FF
    const B = f & 0x0000FF
    return '#' + (
      0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    ).toString(16).slice(1)
  },

  hex2rgba: function (hexColor, opacity) {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, 0.8)`
  }

}
