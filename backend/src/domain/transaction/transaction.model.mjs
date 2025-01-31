import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbService } from '../../providers/database.service.mjs'
import { DynamicConfiguration } from '../dynamic-configuration/dynamic-configuration.model.mjs'


export class EthereumTransaction extends Model {

    id

    constructor(rawTransaction) {
        this.id = rawTransaction.id
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
        },
        blockNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        blockHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fromAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        toAddress: {
            type: DataTypes.STRING,
            allowNull: true, // Can be NULL if it's a contract creation transaction
        },
        value: {
            type: DataTypes.DECIMAL(78, 0), // Store ETH in Wei (large values)
            allowNull: false,
            defaultValue: 0,
        },
        gas: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        gasPrice: {
            type: DataTypes.DECIMAL(78, 0), // Store gas price in Wei
            allowNull: false,
        },
        nonce: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        inputData: {
            type: DataTypes.TEXT, // Store contract interaction data
            allowNull: true,
        },
        transactionIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW, // Automatically set timestamp
        },
    },
    {
      sequelize: dbService.getClient(), // We need to pass the connection instance
      modelName: 'ethereum_transaction', // We need to choose the model name
      tableName: 'ethereum_transaction',
      createdAt: 'created_at',
      updatedAt: false
    },
  );

  EthereumTransaction.dynamic_configuration = EthereumTransaction.belongsTo(DynamicConfiguration, { foreignKey: 'configuration_id' })