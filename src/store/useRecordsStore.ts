import axios, { AxiosResponse } from 'axios';
import { create } from 'zustand';

import { RecorsStore, Record } from '../types';

const useRecordsStore = create<RecorsStore>((set) => ({
  records: [],
  isLoading: false,
  error: '',
  idRecord: null,
  getRecords: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data }: AxiosResponse<Record[]> =
        await axios(`${import.meta.env.VITE_URL_SERVER}/records`);
      set((state) => ({ ...state, records: data, isLoading: false }));
      const recordId = localStorage.getItem('recordID')
      if (recordId !== null) set((state) => ({...state, idRecord: Number(recordId)}));
    } catch (e) {
      set((state) => ({ ...state, isLoading: false, error: e.message }));
      console.error(e);
    }
  },
  checkRecordById: async (recordId: number) => {
    try {
      const { data }: AxiosResponse<number> =
        await axios.get(`${import.meta.env.VITE_URL_SERVER}/records/${recordId}`);
        console.log(data)
      set((state) => ({...state, idRecord: data }));
    } catch (e) {
      localStorage.removeItem('recordID');
      set((state) => ({...state, isLoading: false, idRecord: null }));
      console.error(e);
    }
  },
  addRecords: async (text: string) => {
    try {
      const { data }: AxiosResponse<Record> =
        await axios.post(`${import.meta.env.VITE_URL_SERVER}/records`, { text });
      set((state) => ({...state, records: [...state.records, data], isLoading: false }));
      localStorage.setItem('recordID', String(data.id));
      set((state) => ({...state, idRecord: data.id}));
    } catch (e) {
      set((state) => ({...state, isLoading: false, error: e.message }));
      console.error(e);
    }
  },
  updateRecord: async (id: number, text: string) => {
    try {
      const { data }: AxiosResponse<Record> =
        await axios.put(`${import.meta.env.VITE_URL_SERVER}/records/${id}`, { text });
      set((state) => ({
       ...state,
        records: state.records.map((record) =>
          record.id === id ? {...record, text: data.text } : record
        ),
      }));
    } catch(e) {
      set((state) => ({...state, isLoading: false, error: e.message }));
      console.error(e);
    }
  }
}));

export default useRecordsStore;