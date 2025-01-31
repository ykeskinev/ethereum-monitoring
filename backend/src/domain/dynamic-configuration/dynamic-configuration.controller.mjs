import { Controller } from "../../common/controller.base.mjs"
import { BadRequestError } from "../../utils/error-handler.mjs"
import { dynamicConfigurationService } from './dynamic-configuration.service.mjs'

class DynamicConfigurationController extends Controller {

    async init(app) {

        app.post('/configuration', async (req, res, next) => {
            try {
                const result = await dynamicConfigurationService.createConfiguration(req.body)
                res.send(result)
            } catch(e) {
                next(e)
            }   
        })

        app.put('/configuration', async (req, res, next) => {
            try {
                const result = await dynamicConfigurationService.getConfigurations()
                res.send(result)
            } catch(e) {
                next(e)
            }
          
        })

        app.get('/configuration/:id', async (req, res, next) => {
            try {
                const id = req.params.id

                if (!id) {
                    throw new BadRequestError('configuration/get-failed', 'Please provide id!')
                }
                const result = await dynamicConfigurationService.getConfigurations(id)
                res.send(result)
            } catch(e) {
                next(e)
            }
            
        })

        app.get('/configurations', async (req, res, next) => {
            try {
                const result = await dynamicConfigurationService.getConfigurations()
                res.send(result)
            } catch(e) {
                next(e)
            }
            
        })
    }
}

export const dynamicConfigurationController = new DynamicConfigurationController()