import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

// Styles
import './main.scss'

// Filters
import './filters/numbers'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
