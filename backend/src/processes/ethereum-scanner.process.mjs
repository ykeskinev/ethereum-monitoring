import { wait } from "../utils/wait.mjs"
import { dynamicConfigurationService } from "../domain/dynamic-configuration/dynamic-configuration.service.mjs"
import { EthereumTransaction, EthereumBlock } from '../domain/transaction/transaction.model.mjs'
import { infuraService } from "../providers/infura.service.mjs"
import Web3 from 'web3'
import fs from 'fs'
import { transactionService } from '../domain/transaction/transaction.service.mjs'


class EthereumScannerProcess {

    #subscribers
    #etherClient
    #scanningClient
    #activeConfigurations
    #isMonitoring
    #blocksToScan
    #maxLastBlocksToScan
    #newBlocksSubscription
    #processInterval

    constructor() {
        this.#subscribers = []
        this.#etherClient = new Web3(`${process.env.INFURA_BASE_URL}/${process.env.INFURA_KEY}`)
        this.#scanningClient = new Web3(`${process.env.INFURA_SOCKET}/${process.env.INFURA_KEY}`)
        this.#isMonitoring = true
        this.#blocksToScan = []
        this.#maxLastBlocksToScan = process.env.LAST_BLOCKS_TO_SCAN ? 
            Number(process.env.LAST_BLOCKS_TO_SCAN) :
            10
    }

    async init() {
        // Start scanning
        await this.startScanning()
     
        
        // Get the active configurations
        // Get the number of last handled block from our DB
        // Get the number of the last mined block from the mainnet
        const [activeConfigurations, lastScannedBlock, lastMinedBlock] = await Promise.all([
            dynamicConfigurationService.getConfigurations(),
            transactionService.getHighestBlockNumber(),
            this.#etherClient.eth.getBlockNumber()
        ])
        
        this.#activeConfigurations = activeConfigurations
        
        // Decide how many blocks back we want to scan
        const bigIntMax = (...args) => args.reduce((m, e) => e > m ? e : m);
        const firstBlockToScan = bigIntMax(lastScannedBlock, (lastMinedBlock - BigInt(this.#maxLastBlocksToScan)))
        // Generate the ids of the blocks that need to be scanned
        const blocksToScan = []

        for (let i = lastMinedBlock; i > firstBlockToScan; i -= BigInt(1)) {
            if (!this.#blocksToScan.includes(i)) {
                blocksToScan.push(i)
            }
        }
        this.#blocksToScan.unshift(...blocksToScan)

        //start processing the blocks
        await this.startProcessing()
    }

    async startScanning() {
        this.newBlocksSubscription = await this.#scanningClient.eth.subscribe('newHeads');
        console.log('Scanning...')
        this.newBlocksSubscription.on('data', data => {
            console.log('New block: ', data)
            if (!this.#blocksToScan.includes(data.number)) {
                this.#blocksToScan.unshift(data.number)
            }
            
            console.log('-------------', this.#blocksToScan)
        });
    }

    async startProcessing() {
        this.#processInterval = setInterval(async () => {
            if (this.#blocksToScan.length) {
                const blockNumberToHandle = this.#blocksToScan.pop()
                console.log('Will handle', blockNumberToHandle)
                await this.handleBlock(blockNumberToHandle)
            }
        }, 1000)
    }

    async handleBlock(blockNumberToHandle) {
        const detailedBlock = await this.#etherClient.eth.getBlock(blockNumberToHandle, true)
        console.log('-------------')
        console.log(detailedBlock)
        const block = await transactionService.createBlock(detailedBlock)
        const rawTransactions = detailedBlock.transactions
        await transactionService.createBatchTransactions(rawTransactions, block.id)
    }

    subscribe(subscriber) {
        this.#subscribers.push(subscriber)
    }

    unsubscribe(subscriber) {
        // TODO
    }

    notify(transaction) {
        // for (const subscriber of this.#subscribers) {
        //     subscriber.handleEvent(new Transaction(transaction))
        // }
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