import logo from './logo.svg';
import displayPanel from './panel';
import allJobs from './allJobs';
import headerPanel from './headerPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <headerPanel/>
      <allJobs/>
     <displayPanel title="waiting to hear from" />
     <displayPanel title="interview"/>
     <displayPanel title ="offer"/>
    </div>
  );
}

export default App;
