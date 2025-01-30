export class DynamicConfiguration {
    #rules = []
    
    constructor() {

    }

    async validateTransaction(transaction) {
        // This should be called by the ethereum scanner
        // Ethereum transaction should be passed
        // Pass the transaction through all rules
        // If it passes, persist in the DB
        console.log('Validating Transaction', transaction)
    }

}