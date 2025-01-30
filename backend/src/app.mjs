import express from 'express'
import dotenv from 'dotenv'
import { dynamicConfigurationController } from './domain/dynamic-configuration/dynamic-configuration.controller.mjs'
import { transactionController } from './domain/transaction/transaction.controller.mjs'
import { dbService } from './providers/database.service.mjs'
import { ethereumScannerProcess} from './processes/ethereum-scanner.process.mjs'

const app = express()
const controllers = [
  dynamicConfigurationController,
  transactionController
]


bootstrap()

async function bootstrap() {
  dotenv.config()

  await Promise.all(controllers.map(controller => controller.init(app)))
  await dbService.connect()
  await ethereumScannerProcess.init()
  
  
  app.listen(process.env.BE_PORT, () => {
    console.log(`Ethereum Scan app listening on port ${process.env.BE_PORT}`)
  })
}