import { dbService  } from "../../providers/database.service.mjs";
import { DynamicConfiguration } from "./dynamic-configuration.model.mjs";
import { BadRequestError, InternalError } from "../../utils/error-handler.mjs";

class DynamicConfigurationService {
    
    constructor() {

    }

    async createConfiguration(payload) {
        try { 
            const result = await DynamicConfiguration.create(
                payload,
                {
                    include: [DynamicConfiguration.rules],
                },
            )
    
            return result.dataValues
        } catch(e) {
            throw new BadRequestError('configuration/create-failed', e.message)
        }
        
    }

    async getConfigurations() {
        try {
            const result = await DynamicConfiguration.findAll( {
                include: [DynamicConfiguration.rules],
            })
    
            return [result]
        } catch(e) {
            throw new InternalError('configuration/get-all-failed', e.message)
        }
    }

    async getConfiguration(id) {
        try {
            const result = await DynamicConfiguration.findOne(
                id,
                {
                    include: [DynamicConfiguration.rules],
                }
            )

            return result
        } catch(e) {
            throw new InternalError('configuration/get-failed', e.message) 
        }
    }

    async updateConfiguration() {
        const result = await dbService.query()

        return result
    }

    async validateTransaction() {

    }
}

export const dynamicConfigurationService = new DynamicConfigurationService()