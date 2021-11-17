import React from 'react';
import JobCard from './JobCard';
 function DisplayPanel ({title, jobData, status}){
const filteredJobs= jobData.filter((job)=>(
    job.status === status
))
const jobCard = filteredJobs.map((job)=>(
    <JobCard key={job.id} job={job} />
))
    return(
        <div className= "displayPanels">
        <h3>{title}</h3>
         {jobCard}
        </div>
    )

}
export default DisplayPanel