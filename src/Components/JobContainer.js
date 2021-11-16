import React from 'react';
import JobCard from './JobCard';

 function JobContainer ({jobData, handleModal}){
    
    return(
        <div>
            <h1>Jobs</h1>
            <div>{jobData.map(job => <JobCard key={job.id} job={job} handleModal={handleModal}/>)}</div>
        </div>
    )
}
export default JobContainer