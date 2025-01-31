import express from 'express'
import { dynamicConfigurationController } from './domain/dynamic-configuration/dynamic-configuration.controller.mjs'
import { transactionController } from './domain/transaction/transaction.controller.mjs'
import { dbService } from './providers/database.service.mjs'
import { ethereumScannerProcess} from './processes/ethereum-scanner.process.mjs'
import { dynamicConfigurationHandler } from './domain/dynamic-configuration/dynamic-configuration.handler.mjs'

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

  //init all controllers
  await Promise.all(controllers.map(controller => controller.init(app)))
  
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