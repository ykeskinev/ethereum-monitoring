import { dbService  } from "../../providers/database.service.mjs";
import { Transaction } from "./transaction.model.mjs";

class TransactionService {
    
    constructor() {

    }

    async getTransactions() {
        // const result = await dbService.query()
        return [new Transaction()]
    }

    async getTransaction(id) {
        const result = await dbService.query()
        return result
    }

}

export const transactionService = new TransactionService()