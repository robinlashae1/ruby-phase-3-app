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

  const API = 'http://localhost:9292/applications'
  const apiComm = 'http://localhost:9292/communications'

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(job => setJobData(job))
  }, [])

   useEffect(() => {
    fetch(apiComm)
    .then(response => response.json())
    .then(commData => setCommunicationData(commData))
  },[])

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


  return (
    <div className="App">
      <Header handleSearch={handleSearch}/>
      <LoginForm />
      <JobContainer handleModal={handleModal} jobData={searchFilter}/>
      {isModalOpen && <ModalContainer setModalOpen={setModalOpen} communicationData={communicationData} />}
     <DisplayPanel title="waiting to hear from"/>
     <DisplayPanel title="interview"/>
     <DisplayPanel title="offer"/>
     
    </div>
  );
}

export default App;


