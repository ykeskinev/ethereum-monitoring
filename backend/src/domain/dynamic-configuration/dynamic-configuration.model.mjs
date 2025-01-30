import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        port: process.env.POSTGRES_PORT
    }
)

export class DynamicConfiguration extends Model {
    #rules = []

    async validateTransaction(transaction) {
        // This should be called by the ethereum scanner
        // Ethereum transaction should be passed
        // Pass the transaction through all rules
        // If it passes, persist in the DB
        console.log('Validating Transaction', transaction)
    }
}

DynamicConfiguration.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'dynamic_configuration', // We need to choose the model name
    tableName: 'dynamic_configuration',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
);



export class Rule extends Model {

}

Rule.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field: {
        type: DataTypes.ENUM,
        values: ['gas', 'from', 'to']
    },
    operator: {
        type: DataTypes.ENUM,
        values: ['>', '=', '<']
    },
    check_value: {
        type: DataTypes.STRING
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'rule', // We need to choose the model name
    tableName: 'rule',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
);



Rule.dynamic_configuration = Rule.belongsTo(DynamicConfiguration, { foreignKey: 'configuration_id' })
DynamicConfiguration.rules = DynamicConfiguration.hasMany(Rule, { foreignKey: 'configuration_id' })