export interface Record {
  id: number;
  text: string;
}

export interface RecorsStore {
  records: Record[];
  isLoading: boolean;
  error: string;
  idRecord: number | null;
  getRecords: () => void;
  checkRecordById: (recordId: number) => void;
  addRecords: (text: string) => void;
  updateRecord: (id: number, text: string) => void;
  
}