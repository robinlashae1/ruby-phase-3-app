import JobContainer from "./JobContainer";
import Header from "./Header";
import {useEffect, useState} from 'react';
import DisplayPanel from "./DisplayPanel";
import Modal from "./Modal/Modal";
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
  const [modal, setModal] = useState({})
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

  const addJob = (newJob) => {
    setJobData(currentJobData => [...currentJobData, newJob]);
  }

  const updateJob = (updatedJob) => {
    setJobData(currentJobData => currentJobData.map(job => (
      job.id === updatedJob.id ? updatedJob : job
    )));
  };

  const addCommunication = (newCommunication) => {
    setCommunicationData(currentCommunicationData => [...currentCommunicationData, newCommunication]);
  };

  const updateCommunication = (updatedCommunication) => {
    setCommunicationData(currentCommunicationData => currentCommunicationData.map(communication => (
      communication.id === updatedCommunication.id ? updatedCommunication : communication
    )))
  };

  const handleSearch = (e) => {
    const filtered = jobData.filter((job) => {
      return job.company.includes(e.target.value)
    })
    setSearchFilter(filtered)
  }
  //experminting with sorting

  const handleModal = (modalName) => {
    console.log(modalName);
    setModal(modalName)
  }
  
  const handleUserIdUpdate = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <div className="App">
      {modal.name ? <Modal modal={modal} handleModal={handleModal} addJob={addJob} updateJob={updateJob} addCommunication={addCommunication} updateCommunication={updateCommunication} handleUserIdUpdate={handleUserIdUpdate} /> : null}
      <Header handleSearch={handleSearch} userId={userId} handleUserIdUpdate={handleUserIdUpdate} handleModal={handleModal} />
      <div id="jobDisplay">
        <JobContainer jobData={searchFilter.filter((job) => {return job.favorite})} communicationData={communicationData} updateJob={updateJob} handleModal={handleModal} />
        <div className="job-groups">
          <DisplayPanel title="Applied" jobData={searchFilter}  status="pending" communicationData={communicationData} updateJob={updateJob} handleModal={handleModal} />
          <DisplayPanel title="Interviewing" jobData={searchFilter}  status="interviewing" communicationData={communicationData} updateJob={updateJob} handleModal={handleModal} />
          <DisplayPanel title="Offer Made" jobData={searchFilter}  status="offer made" communicationData={communicationData} updateJob={updateJob} handleModal={handleModal} />
          <DisplayPanel title="Wishlist" jobData={searchFilter} status="wishlist" communicationData={communicationData} updateJob={updateJob} handleModal={handleModal} />
          <DisplayPanel title="Rejected" jobData={searchFilter} status="rejected" communicationData={communicationData} updateJob={updateJob} handleModal={handleModal} />
        </div>
      </div>
    </div>
  );
}

export default App;


