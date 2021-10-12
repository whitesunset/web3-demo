export type Token = {
  background: string
  contractAddress: string
  pool: Coin[]
}

export type Coin = {
  id: string
  symbol: string
  decimals: number
}
