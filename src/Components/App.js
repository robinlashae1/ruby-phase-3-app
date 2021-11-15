import JobContainer from "./JobContainer";
import Header from "./Header";
import {useEffect, useState} from 'react';


function App() {
  const [jobData, setJobData] = useState([])
  const [searchFilter, setSearchFilter] = useState(jobData)

  const API = 'http://localhost:9292/applications'

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(job => setJobData(job))
  }, [])

  useEffect(() => {
    setSearchFilter(jobData)
  },[jobData])

  const handleSearch = (e) => {
    const filtered = jobData.filter((job) => {
      return job.company.includes(e.target.value)
    })
    setSearchFilter(filtered)
  }


  return (
    <div className="App">
      <Header handleSearch={handleSearch}/>
      <JobContainer jobData={searchFilter}/>
     
    </div>
  );
}

export default App;
