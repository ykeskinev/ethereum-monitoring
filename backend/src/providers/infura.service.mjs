import axios from 'axios'

class InfuraService {
    constructor() {}

    async getBlock() {
        try {
            const response = await axios
                .post(`${INFURA_BASE_URL}/${process.env.INFURA_KEY}`, {
                    jsonrpc: "2.0",
                    method: "eth_blockNumber",
                    params: [],
                    id: 1,
                })

            return response.data
        } catch(e) {
            handleError(e)
        }
    }
    
}

export const infuraService = new InfuraService()