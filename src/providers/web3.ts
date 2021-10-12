import Web3 from 'web3'
import ABI from './../assets/abi.json'
import type { Contract } from 'web3-eth-contract'

const web3 = new Web3(new Web3.providers.HttpProvider('https://rpcapi.fantom.network'))

export default class Web3Provider {
  static async initContract(address: string): Promise<Contract> {
    // @ts-ignore
    // https://github.com/ChainSafe/web3.js/issues/3310
    return new web3.eth.Contract(ABI as any, address)  
  }
}
