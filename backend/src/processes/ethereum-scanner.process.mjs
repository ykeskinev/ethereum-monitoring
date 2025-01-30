import { wait } from "../utils/wait.mjs"
import { dynamicConfigurationService } from "../domain/dynamic-configuration/dynamic-configuration.service.mjs"
import { Transaction } from '../domain/transaction/transaction.model.mjs'


class EthereumScannerProcess {

    #activeConfigurations
    
    constructor() {}

    async init() {
        const configurations = await dynamicConfigurationService.getConfigurations()
        this.#activeConfigurations = configurations
        // TODO connect to ETH network and start receiving
        this.receiveNewTransaction()
    }

    async receiveNewTransaction() {
        let counter = 0
        while (true) {
            counter++
            console.log('Got new transaction', counter)
            for (const configuration of this.#activeConfigurations) {
                configuration.validateTransaction(new Transaction({ id: counter }))
            }
            await wait(1000)
            
        }
        
        handler({}) // TODO: replace with actual transaction from the network
    }
}

export const ethereumScannerProcess = new EthereumScannerProcess()