class DatabaseService {
    constructor() {

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