import { APIClient } from '@liskhq/lisk-api-client';

const API_BASEURL = 'https://lisk-ride.com/api-main';

export const api = new APIClient([API_BASEURL]);