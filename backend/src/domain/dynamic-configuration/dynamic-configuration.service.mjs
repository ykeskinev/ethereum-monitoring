import { dbService  } from "../../providers/database.service.mjs";
import { DynamicConfiguration } from "./dynamic-configuration.model.mjs";

class DynamicConfigurationService {
    
    constructor() {

    }

    async createConfiguration() {
        const result = await DynamicConfiguration.create(
            {
                name: "Detect Expensive Transactions 9",
                rules: [
                    {
                        name: 'Expensive Transactions',
                        field: 'gas',
                        operator: '>',
                        check_value: '10000'
                    },
                    {
                        name: 'To Our address',
                        field: 'to',
                        operator: '=',
                        check_value: 'dasdafafaffs'
                    },
                ]
            },
            {
                include: [DynamicConfiguration.rules],
            },
        )

      
        console.log('result', result)
        return result.dataValues
    }

    async getConfigurations() {
        // const result = await dbService.query()
        return [new DynamicConfiguration()]
    }

    async getConfiguration(id) {
        const result = await dbService.query()
        return result
    }

    async updateConfiguration() {
        const result = await dbService.query()
        return result
    }

    async validateTransaction() {

    }
}

export const dynamicConfigurationService = new DynamicConfigurationService