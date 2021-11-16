import React from 'react'
import { useState } from 'react/cjs/react.development';

function JobCard({job, communicationData}) {
    const [displayCommunication, setDisplayCommunication] = useState(false)

    function handleCommunication () {
        setDisplayCommunication(!displayCommunication)
    }
    return (
        <div className="displayPanels">
            <div  >

                <h4>{job.company}</h4>
                <h5>{job.position}</h5>
                <p>{job.status}</p>
                <img onClick={handleCommunication} src={job.logo_url} alt="Company logo" />
            </div>
                {displayCommunication ? (
            <div>
                {communicationData.map((data) => {
                    return <p>Comment: {data.comment} <p>Date Applied: {data.time.split("T")[0]}</p></p> })}
            </div>
                ) : (null)}

        </div>
    )
}

export default JobCard;