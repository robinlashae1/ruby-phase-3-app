import React from 'react'

function JobCard({job}) {
    return (
        <div className="displayPanels">
            <h4>{job.company}</h4>
            <h5>{job.position}</h5>
            <p>{job.status}</p>
            <img src={job.logo_url} alt="Company logo" />
        </div>
    )
}

export default JobCard;