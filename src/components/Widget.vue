<template>
  <!-- Loading -->
  <v-progress-circular 
    indeterminate 
    color="purple" 
    size="100" 
    class="mx-auto"
    v-if="loading" 
  />
  
  <!-- Widget -->
  <v-card
    class="widget mx-auto text-left"
    :max-width="$vuetify.breakpoint.mdAndUp ? '50%' : undefined"
    v-else
  >
    <v-img
      class="white--text align-end"
      height="100px"
      :src="token.background"
    >
      <v-card-title>{{ tokenName }}</v-card-title>
    </v-img>
    <v-card-text>
      <!-- Token info -->
      <div class="text--primary subtitle-1 font-weight-medium">
        <v-simple-table light>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Price</td>
                <td align="right">${{ price | pretty }}</td>
              </tr>
              <tr>
                <td>Supply</td>
                <td align="right">{{ supply | decimals(decimals) | pretty }}</td>
              </tr>
              <tr>
                <td>Market Cap</td>
                <td align="right">${{ mcap | decimals(decimals) | pretty }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card-text>

    <!-- Actions -->
    <v-card-actions class="text-right">
      <!-- Explorer Link -->
      <v-btn
        class="mx-auto"
        x-large
        color="purple"
        text
        target="_blank"
        :href="explorerUrl"
      >
        Learn More
      </v-btn>
      
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Web3 from './../providers/web3'
import Coingecko from '../providers/coingecko'
import type { Token } from './../model/Widget'
import type { Prices } from './../model/Coingecko'
import type { Reserve } from './../model/Contract'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Widget extends Vue {
  @Prop() private token!: Token
  @Prop() private currency!: string

  reserve: Reserve = {
    _reserve0: 0,
    _reserve1: 0,
    _blockTimestampLast: 0,
  }
  decimals = 18
  supply = 0
  prices: Prices = {}
  loading = true

  get tokenName (): string {
    return `${this.token.pool[0].symbol}/${this.token.pool[1].symbol}`
  }

  get poolValue (): number {
    const pool0Reserve = this.reserve._reserve0 / 10 ** this.token.pool[0].decimals
    const pool0Value = pool0Reserve * this.prices[this.token.pool[0].id][this.currency]
    const pool1Reserve = this.reserve._reserve1 / 10 ** this.token.pool[1].decimals
    const pool1Value = pool1Reserve * this.prices[this.token.pool[1].id][this.currency]

    return pool0Value + pool1Value
  }

  get price (): number {
    return this.poolValue / (this.supply / 10 ** this.decimals)
  }

  get mcap (): number {
    return this.price * this.supply
  }

  get explorerUrl(): string {
    return `https://ftmscan.com/token/${this.token.contractAddress}`
  }

  mounted (): void {
    this.fetch()
  }

  async fetch (): Promise<void> {
    try {
      const contract = await Web3.initContract(this.token.contractAddress)
      
      // Web3
      this.reserve = await contract.methods.getReserves().call()
      this.decimals = await contract.methods.decimals().call()
      this.supply = await contract.methods.totalSupply().call()
      
      // Coingecko
      this.prices = await Coingecko.getPrice([this.token.pool[0].id, this.token.pool[1].id])
      
      // Loading
      this.loading = false
    } catch (e) {
      console.error(e)
      
      this.$emit('error', true)
    }
  }
}
</script>