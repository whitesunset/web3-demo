import CoinGecko from 'coingecko-api'
import { Prices } from '@/model/Coingecko'

const CoinGeckoClient = new CoinGecko()

export default class CoingeckoProvider {
  static async getPrice(ids: string[], currency = 'usd'): Promise<Prices> {
    const response = await CoinGeckoClient.simple.price({ ids, vs_currencies: [currency] })
  
    return response.data
  }
}
