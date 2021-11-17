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
      <JobContainer jobData={searchFilter} communicationData={communicationData}/>
      {/* <ModalContainer setModalOpen={setModalOpen} communicationData={communicationData}/> */}
     <DisplayPanel title="waiting to hear from"/>
     <DisplayPanel title="interview"/>
     <DisplayPanel title="offer"/>
     </div>
    </div>
  );
}

export default App;


