// 处理 NFT 合约中的 Transfer 事件
import { Transfer as TransferEvent } from "../generated/templates/S2NFT/S2NFT"
import {
    TokenInfo
  } from "../generated/schema"
import { S2NFT } from "../generated/templates/S2NFT/S2NFT"

export function handleTokenTransfer(event: TransferEvent): void {

  // 获取合约实例
  let contract = S2NFT.bind(event.address)

  let id = "001" + "-" + event.address.toHex() + "-" + event.params.tokenId.toString()
  let entity = new TokenInfo(id)
  entity.ca = event.address
  entity.tokenId = event.params.tokenId
  const v1 = contract.tokenURI(event.params.tokenId)
  const v2 = contract.name()
  entity.tokenURL = v1
  entity.name = v2
  entity.owner = event.params.to
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}