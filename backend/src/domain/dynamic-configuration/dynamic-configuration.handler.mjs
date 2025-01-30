import { dynamicConfigurationService } from './dynamic-configuration.service.mjs'

class DynamicConfigurationHandler {
    
    #activeConfigurations = []

    constructor(){

    }

    async init() {
        const activeConfigurations = await dynamicConfigurationService.getConfigurations()
        this.#activeConfigurations = activeConfigurations
    }

    async handleEvent(transaction) {
        console.log('Filtering Transactions', transaction)
        await Promise.all(this.#activeConfigurations.map(config => config.validateTransaction(transaction)))
    }
}

export const dynamicConfigurationHandler = new DynamicConfigurationHandler()