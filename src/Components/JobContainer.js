import React from 'react';
import JobCard from './JobCard';

 function JobContainer ({jobData, handleModal, communicationData}){
    
    return(
        <div id="allJobs">
            <h1>All Jobs</h1>
            <div>{jobData.map(job => <JobCard key={job.id} job={job} handleModal={handleModal} communicationData={communicationData.filter((communication) => {return communication.application_id === job.id} )}/>)}</div>
        </div>
    )
}
export default JobContainer