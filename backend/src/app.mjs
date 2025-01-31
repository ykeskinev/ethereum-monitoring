import express from 'express'
import 'body-parser' from 'body-parser'
import { dynamicConfigurationController } from './domain/dynamic-configuration/dynamic-configuration.controller.mjs'
import { transactionController } from './domain/transaction/transaction.controller.mjs'
import { dbService } from './providers/database.service.mjs'
import { ethereumScannerProcess} from './processes/ethereum-scanner.process.mjs'
import { dynamicConfigurationHandler } from './domain/dynamic-configuration/dynamic-configuration.handler.mjs'
import { handledErrorHandler, unhandledErrorHandler } from './utils/error-handler.mjs'

const app = express()
// add new controllers here
const controllers = [
  dynamicConfigurationController,
  transactionController
]

// add new handlers here
const handlers = [
  dynamicConfigurationHandler,
]

// add new processes here
const processes = [
  ethereumScannerProcess,
]

bootstrap()

async function bootstrap() {
  app.use(express.json());
  app.use()

  //init all controllers
  await Promise.all(controllers.map(controller => controller.init(app)))

  //error handling
  app.use(handledErrorHandler)
  app.use(unhandledErrorHandler)
  
  //init all handlers
  await Promise.all(handlers.map(handler => handler.init()))
  
  //subscribe handlers to processes
  ethereumScannerProcess.subscribe(dynamicConfigurationHandler)
  
  //start all Processes
  await Promise.all(processes.map(process => process.start()))

  //init providers
  await dbService.init()
  
  app.listen(process.env.BE_PORT, () => {
    console.log(`Ethereum Scan app listening on port ${process.env.BE_PORT}`)
  })
}