
import { Chainlink } from "dev3-sdk"

import { PriceFeedModel } from "polycode-chainlink-feeds"
import { PriceFeedsBSC, PriceFeedsETH, PriceFeedsAVAX } from "polycode-chainlink-feeds"

export interface PriceFeedItemModel {
    address: string
    name: string
    assetName: string
    feedType: string
}

export class PriceFeedsGoerli implements PriceFeedModel {

    network = 5

        ETH_USD: PriceFeedItemModel = {
            address: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
            name: "ETH / USD",
            assetName: "Ethereum",
            feedType: "Crypto"
        }
}

export class PriceFeedsPolygon implements PriceFeedModel {

    network = 5

        MATIC_USD: PriceFeedItemModel = {
            address: "0xab594600376ec9fd91f8e885dadf0ce036862de0",
            name: "MATIC / USD",
            assetName: "Matic",
            feedType: "Crypto"
        }
}



export async function GetNativeTokenPrice(provider: any, chainId: number) {
    let feeds: any;
    let token: any;
    switch(chainId) {
        case 1: 
            feeds = new PriceFeedsETH()
            token = feeds.ETH_USD;break
        case 5: 
            feeds = new PriceFeedsGoerli()
            token = feeds.ETH_USD;break
        case 56: 
            feeds = new PriceFeedsBSC()
            token = feeds.BNB_USD;break
        case 137: 
            feeds = new PriceFeedsPolygon()
            token = feeds.MATIC_USD;break
        case 43114: 
            feeds = new PriceFeedsAVAX()
            token = feeds.AVAX_USD;
    }

    const ethSDK = Chainlink.instance(provider, feeds)
    return await ethSDK.getFromOracle(token)
}

