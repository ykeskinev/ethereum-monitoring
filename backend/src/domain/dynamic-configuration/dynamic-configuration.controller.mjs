import { Controller } from "../../common/controller.base.mjs"
import { dynamicConfigurationService } from './dynamic-configuration.service.mjs'

class DynamicConfigurationController extends Controller {

    async init(app) {
        app.get('/configurations', async (req, res) => {
            const result = await dynamicConfigurationService.getConfigurations();
            res.send(result)
        })
    }
}

export const dynamicConfigurationController = new DynamicConfigurationController()