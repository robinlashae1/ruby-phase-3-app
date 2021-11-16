import React from 'react'

function JobCard({job, handleModal}) {
    return (
        <div className="displayPanels">
            <div  >
                <h4>{job.company}</h4>
                <h5>{job.position}</h5>
                <p>{job.status}</p>
                <img onClick={handleModal} src={job.logo_url} alt="Company logo" />
            </div>
        </div>
    )
}

export default JobCard;