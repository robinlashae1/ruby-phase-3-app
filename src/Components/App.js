import JobContainer from "./JobContainer";
import Header from "./Header";
import {useEffect, useState} from 'react';
import DisplayPanel from "./DisplayPanel";

function App() {
  const [jobData, setJobData] = useState([])
  const [searchFilter, setSearchFilter] = useState(jobData)
  const[pendingJobs,setPendingJobs]= useState([])
  const[interviewJobs,setInterviewJobs]=useState([])
  const[offerJobs,setOfferJobs]=useState([])
  const[rejectedJobs,setRejectedJobs]=useState([])
  const[sortedJobs,setSortedJobs]=useState([])

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
  //experminting with sorting


  return (
    <div className="App">
      <Header handleSearch={handleSearch}/>
      <div id="jobDisplay">
      <JobContainer jobData={searchFilter} />
     <DisplayPanel title="waiting to hear from" jobData={searchFilter}  status="pending"/>
     <DisplayPanel title="interview" jobData={searchFilter}  status="interviewing"/>
     <DisplayPanel title="offer" jobData={searchFilter}  status="offer made"/>
     <DisplayPanel title="Wishlist" jobData={searchFilter} status=""/>
     <DisplayPanel title="Rejected" jobData={searchFilter} status="rejected"/>
     </div>
    </div>
  );
}

export default App;
