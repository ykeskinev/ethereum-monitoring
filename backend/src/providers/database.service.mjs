import { Sequelize } from 'sequelize'

class DatabaseService {
    
    #client

    constructor() {
        this.#client = new Sequelize(
            process.env.POSTGRES_DB,
            process.env.POSTGRES_USER,
            process.env.POSTGRES_PASSWORD,
            {
                host: process.env.POSTGRES_HOST,
                dialect: 'postgres',
                port: process.env.POSTGRES_PORT
            }
        )
    }

    async init() {
        try {
            await this.#client.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }

    async query() {
        console.log('Make a query')
        return []
    }

    async connect() {
        console.log('Connected to DB...')
    }


}

export const dbService = new DatabaseService()