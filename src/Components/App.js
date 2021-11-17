import JobContainer from "./JobContainer";
import Header from "./Header";
import {useEffect, useState} from 'react';
import DisplayPanel from "./DisplayPanel";
import ModalContainer from "./Modal/ModalContainer";
import LoginForm from "./LoginForm"

function App() {
  const [jobData, setJobData] = useState([])
  const [communicationData, setCommunicationData] = useState([])
  const [searchFilter, setSearchFilter] = useState(jobData)
  const[pendingJobs,setPendingJobs]= useState([])
  const[interviewJobs,setInterviewJobs]=useState([])
  const[offerJobs,setOfferJobs]=useState([])
  const[rejectedJobs,setRejectedJobs]=useState([])
  const[sortedJobs,setSortedJobs]=useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  // const [modalFilter, setModalFilter] = useState(communicationData)
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));

  const API = 'http://localhost:9292/applications'
  const apiComm = 'http://localhost:9292/communications'

  useEffect(() => {
    fetch(`${API}?user_id=${userId}&login_token=${localStorage.getItem('login_token')}`)
      .then(response => response.json())
      .then(job => setJobData(job))
  }, [userId])

   useEffect(() => {
    fetch(`${apiComm}?user_id=${userId}&login_token=${localStorage.getItem('login_token')}`)
    .then(response => response.json())
    .then(commData => setCommunicationData(commData))
  },[userId])

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

  const handleModal = () => {
    setModalOpen(true)
  }
  
  const handleUserIdUpdate = (newUserId) => {
    setUserId(newUserId);
  };


  return (
    <div className="App">
      <Header handleSearch={handleSearch} userId={userId} handleUserIdUpdate={handleUserIdUpdate} />
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


