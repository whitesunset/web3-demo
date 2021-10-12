<template>
  <v-app>
    <v-container fill-height>
      <v-row justify="center" align="center">
        <v-col cols="12" class="text-center">
          <Widget :token="token" :currency="currency" @error="onError"/>
        </v-col>
      </v-row>
    </v-container>

    <Alert :error="error" />
  </v-app>
</template>

<script lang="ts">
import { Token } from './model/Widget'
import Alert from './components/Alert.vue'
import Widget from './components/Widget.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Alert,
    Widget,
  },
})
export default class App extends Vue {
  error = false
  currency = 'usd'
  token: Token = {
    background: 'https://pbs.twimg.com/profile_banners/1372756210433204235/1626868223/1500x500',
    contractAddress: '0xec7178f4c41f346b2721907f5cf7628e388a7a58',
    pool: [
      {
        id: 'spookyswap',
        symbol: 'BOO',
        decimals: 18
      }, {
        id: 'fantom',
        symbol: 'FTM',
        decimals: 18
      }
    ]
  }

  onError (value: boolean): void {
    this.error = value
  }
}
</script>
