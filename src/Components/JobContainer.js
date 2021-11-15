import React from 'react';
import JobCard from './JobCard';

 function JobContainer ({jobData}){
    console.log(jobData)
    return(
        <div>
            <h1>Jobs</h1>
            
            <div>{jobData.map(job => <JobCard key={job.id} job={job} />)}</div>
        </div>
    )
}
export default JobContainer