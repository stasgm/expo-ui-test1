import { IData } from '../model/types';
import { get } from './http.service';

export const ROOT_URL = 'https://restcountries.eu/rest/v2/';
// export const ROOT_URL = 'http://192.168.10.100:3649/api/test/';

const api = {
  getAllData: async (signal?: AbortSignal): Promise<IData[]> => get(ROOT_URL, 'all', signal),
};

export default api;
