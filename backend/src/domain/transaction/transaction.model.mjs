import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbService } from '../../providers/database.service.mjs'
import { DynamicConfiguration } from '../dynamic-configuration/dynamic-configuration.model.mjs'
import { InternalError } from '../../utils/error-handler.mjs';


export class EthereumTransaction extends Model {
    static mapFromRaw(rawTransaction) {
        try {
            return {
                txHash: rawTransaction.txHash,
                blockNumber: rawTransaction.blockNumber,
                blockHash: rawTransaction.blockHash,
                fromAddress: rawTransaction.fromAddress,
                toAddress: rawTransaction.toAddress,
                value: rawTransaction.value,
                gas: rawTransaction.gas,
                gasPrice: rawTransaction.gasPrice,
                nonce: rawTransaction.nonce,
                inputData: rawTransaction.inputData,
                transactionIndex: rawTransaction.transactionIndex,
                timestamp: rawTransaction.timestamp,
            }
        } catch(e) {
            console.log(e)
            return {}
        }
        
    }
}

EthereumTransaction.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        txHash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'tx_hash'
        },
        blockNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'block_number'
        },
        blockHash: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'block_hash'
        },
        fromAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'from_address'
        },
        toAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'to_address'
        },
        value: {
            type: DataTypes.DECIMAL(78, 0), 
            allowNull: false,
            defaultValue: 0,
        },
        gas: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        gasPrice: {
            type: DataTypes.DECIMAL(78, 0),
            allowNull: false,
            field: 'gas_price'
        },
        nonce: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        inputData: {
            type: DataTypes.TEXT, // Store contract interaction data
            allowNull: true,
            field: 'input_data'
        },
        transactionIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'transaction_index'
        },
        timestamp: {
            type: DataTypes.BIGINT,
        },
    },
    {
      sequelize: dbService.getClient(),
      modelName: 'ethereum_transaction',
      tableName: 'ethereum_transaction',
      timestamps: false,
    },
);

export class EthereumBlock extends Model {
    static mapFromRaw(rawBlockData) {
        try {
            return {
                number: rawBlockData.number,
                hash: rawBlockData.hash,
                parentHash: rawBlockData.parentHash,
                miner: rawBlockData.miner,
                difficulty: rawBlockData.difficulty,
                gasLimit: rawBlockData.gasLimit,
                gasUsed: rawBlockData.gasUsed,
                transactionCount: rawBlockData.transactions.length,
                timestamp: rawBlockData.timestamp,
                extraData: rawBlockData.extraData,
                size: rawBlockData.size,
                stateRoot: rawBlockData.stateRoot,
                receiptsRoot: rawBlockData.receiptsRoot,
                transactionsRoot: rawBlockData.transactionsRoot
            }
        } catch(e) {
            console.log(e)
            return {}
        }
    }
}

EthereumBlock.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        number: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        parentHash: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'parent_hash'
        },
        miner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.DECIMAL(78, 0), // Large numbers for difficulty
            allowNull: false,
        },
        gasLimit: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'gas_limit'
        },
        gasUsed: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'gas_used'
        },
        transactionCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'transaction_count'
        },
        timestamp: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        extraData: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'extra_data'
        },
        size: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        stateRoot: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'state_root'
        },
        receiptsRoot: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'receipts_root'
        },
        transactionsRoot: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'transactions_root'
        },
    }, {
        sequelize: dbService.getClient(),
        tableName: "ethereum_block",
        tableName: 'ethereum_block',
        timestamps: false,
    }
)

EthereumTransaction.dynamic_configuration = EthereumTransaction.belongsTo(DynamicConfiguration, { foreignKey: 'configuration_id' })
EthereumTransaction.block_id = EthereumTransaction.belongsTo(EthereumBlock, { foreignKey: 'block_id' })