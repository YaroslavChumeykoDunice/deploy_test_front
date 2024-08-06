import { useState } from 'react';
import Add from '../../assets/add.png'
import useRecordsStore from '../../store/useRecordsStore';

import classes from './InputRecord.module.css';

const InputRecord = () => {

  const [inputValue, setInputValue] = useState('');
  const addRecords = useRecordsStore(state => state.addRecords);
  const updateRecord = useRecordsStore(state => state.updateRecord);
  const idRecord = useRecordsStore(state => state.idRecord);

  const addNewRecord = () => {
    if (inputValue.trim() !== '' && inputValue.trim() !== ' ') {
      if (idRecord !== null) {
        updateRecord(idRecord, inputValue)
      } else {
        addRecords(inputValue)
      }
      setInputValue('')
    } 
  };

  return (
    <div className={classes.inputContainer}>
      <input 
        className={classes.inputRecord}
        placeholder={idRecord !== null ? 'Change your Full Name' : 'Enter your Full Name...' }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}/>
      <img className={classes.addRecord} src={Add} alt='Add' onClick={addNewRecord}/>
    </div>
  );
}

export default InputRecord;
