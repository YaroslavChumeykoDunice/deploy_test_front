import classes from './Record.module.css';

interface RecordProps {
  text: string;
  isCurentRecord: boolean;
}

const Record = ({ text, isCurentRecord }: RecordProps ) => {
  return (
    <div className={classes.record}>{isCurentRecord ? '⭐ ': ''}{text}</div>
  );
}

export default Record;
