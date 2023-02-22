import { Constants } from '../constants/constants';

const axios = require('axios');

export class CatService {
    public async getCatData(): Promise<any> {
        try {
            return await axios.get(Constants.CAT_API_URL)
        } catch (error) {
            console.error(error);
            throw Error;
        }
    }
}