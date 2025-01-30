import { Controller } from '../../common/controller.base.mjs'
import { transactionService } from './transaction.service.mjs'

class TransactionController extends Controller {

    async init(app) {
        // todo: add query params and pagination
        app.get('/transactions', async (req, res) => {
            const result = await transactionService.getConfigurations();
            res.send(result)
        })
    }
}

export const transactionController = new TransactionController()