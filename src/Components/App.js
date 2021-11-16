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
const handleSort = (e) => {
sortedJobs = jobData.filter((jobs)=>{
  return jobs.status.includes(e.target.value)
}) 
setSortedJobs(sortedJobs)
}
const handleCategory=(jobData)=>{
  const jobPendingPanel= jobData.map((job)=> {
    if (job.status === "pending"){
      return pendingJobs.push(job)
    }
    else if (job.status==="offer"){
      return offerJobs.push(job)
    }
  })
  setPendingJobs(pendingJobs);
  setOfferJobs(offerJobs)
}
console.log(pendingJobs);

  return (
    <div className="App">
      <Header handleSearch={handleSearch}/>
      <div id="jobDisplay">
      <JobContainer jobData={searchFilter} handleSearch={handleSort}/>
     <DisplayPanel title="waiting to hear from" filterJobs={handleCategory}/>
     <DisplayPanel title="interview" filterJobs={handleCategory}/>
     <DisplayPanel title="offer" filterJobs={handleCategory}/>
     <DisplayPanel title="Wishlist"/>
     <DisplayPanel title="Rejected"/>
     </div>
    </div>
  );
}

export default App;
