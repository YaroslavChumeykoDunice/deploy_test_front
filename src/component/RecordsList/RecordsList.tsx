import { useEffect } from "react";

import useRecordsStore from "../../store/useRecordsStore";
import Record from "../Record";

import classes from './RecordList.module.css'


const RecordsList = () => {
  const getRecords = useRecordsStore(state => state.getRecords)
  const records = useRecordsStore(state => state.records)
  const checkRecordById = useRecordsStore(state => state.checkRecordById)
  
  const recordId = localStorage.getItem('recordID')

  useEffect(() => {
    if (recordId !== null) checkRecordById(Number(recordId))
  }, [recordId])

  useEffect(() => {
    getRecords()
  }, []) 

  return (
    <div className={classes.recordList}>
      {records.length !== 0 && records.map(record => <Record key={record.id} text={record.text} isCurentRecord={Number(record.id )=== Number(recordId) ? true : false}/>)}
    </div>
  );
}

export default RecordsList;