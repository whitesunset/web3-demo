import Vue from 'vue'

Vue.filter('decimals', (value: number, decimals = 18) => {
  if (!value) return ''

  return value / 10 ** decimals
})

Vue.filter('pretty', (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    currency: 'USD',
  })
  return formatter.format(value)
})

