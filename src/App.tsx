import InputRecord from "./component/InputRecord"
import RecordsList from "./component/RecordsList"
import './index.css'

const App = () => {

  return (
    <div className="mainContainer">
      <InputRecord />
      <RecordsList />
    </div>
  )
}

export default App
