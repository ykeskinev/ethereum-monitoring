import { dbService  } from "../../providers/database.service.mjs";
import { EthereumBlock, EthereumTransaction } from "./transaction.model.mjs";

class TransactionService {
    
    constructor() {

    }

    async getTransactions() {
        // const result = await dbService.query()
        return []
    }

    async getTransaction(id) {
        const result = await dbService.query()
        return result
    }

    async createBlock(rawBlock) {
        const result = await EthereumBlock.create(EthereumBlock.mapFromRaw(rawBlock))

        return result
    }

    async getHighestBlockNumber() {
        const result = await EthereumBlock.max('number')
        if (!result) {
            return 0
        }
        return result
    }

    async createBatchTransactions(rawTransactions, blockId) {
        console.log('Will create transactions', rawTransactions.length, blockId)
    }

}

export const transactionService = new TransactionService()