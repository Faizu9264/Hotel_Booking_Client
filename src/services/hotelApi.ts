// src/services/hotelApi.ts

import axios from 'axios';

const BASE_URL = 'your_api_base_url';

export const getHotels = () => axios.get(`${BASE_URL}/hotels`);
