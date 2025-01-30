import { dbService  } from "../../providers/database.service.mjs";
import { DynamicConfiguration } from "./dynamic-configuration.model.mjs";

class DynamicConfigurationService {
    
    constructor() {

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