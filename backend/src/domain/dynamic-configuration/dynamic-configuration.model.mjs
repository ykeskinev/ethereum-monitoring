export class DynamicConfiguration {
    #rules = []
    
    constructor() {

    }

    async validateTransaction(transaction) {
        console.log('Validating Transaction', transaction)
    }

}