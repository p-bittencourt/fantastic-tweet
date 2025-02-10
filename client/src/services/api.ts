import axios from 'axios';
import { CreateThreadDto } from '../types/create-thread.dto';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const threadsApi = {
  getAll: async () => {
    const { data } = await api.get('');
    return data;
  },

  generateThread: async (threadDto: CreateThreadDto) => {
    const { data } = await api.post('/threads', threadDto);
    return data;
  },
};
