import { wait } from "../utils/wait.mjs"
import { dynamicConfigurationService } from "../domain/dynamic-configuration/dynamic-configuration.service.mjs"
import { Transaction } from '../domain/transaction/transaction.model.mjs'
import { infuraService } from "../providers/infura.service.mjs"
import Web3 from 'web3'


class EthereumScannerProcess {

    #subscribers = []
    // #etherClient = new Web3(`${process.env.INFURA_SOCKET}/${process.env.INFURA_KEY}`)

    constructor() {}

    async start() {
        // Get all active configurations and register them
        // Get the number of last handled transaction from our DB
        // Get the number of last transaction from the mainnet
        // Query all missed transactions to catch up
        // Subscribe via web3 websocket to receive new transactions
        // this.#etherClient.eth.subscribe("pendingTransactions", async (error, txHash) => {
        //     if (!error) {
        //         // const transaction = await web3.eth.getTransaction(txHash);
        //         console.log("New Transaction:", txHash);
        //     } else {
        //         console.error(error);
        //     }
        // });
        // Pass each new transaction to each active configuration

        // const configurations = await dynamicConfigurationService.getConfigurations()
        // this.#activeConfigurations = configurations
        // // TODO connect to ETH network and start receiving
        this.startMonitoring()
    }

    subscribe(subscriber) {
        this.#subscribers.push(subscriber)
    }

    unsubscribe(subscriber) {
        // TODO
    }

    notify(transaction) {
        for (const subscriber of this.#subscribers) {
            subscriber.handleEvent(new Transaction(transaction))
        }
    }

    async startMonitoring() {
        let counter = 0
        while (true) {
            counter++
            console.log('Got new transaction', counter)
            this.notify({ id: counter })
            await wait(10)
            
        }
    }
}

export const ethereumScannerProcess = new EthereumScannerProcess()