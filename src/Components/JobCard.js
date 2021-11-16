import React from 'react'
import { useState } from 'react/cjs/react.development';

function JobCard({job, communicationData}) {
    const [displayCommunication, setDisplayCommunication] = useState(false)

    function handleCommunication () {
        setDisplayCommunication(!displayCommunication)
    }
    return (
        <div className="jobCards">
            <img onClick={handleCommunication} src={job.logo_url} alt="Company logo" />
                {displayCommunication ? (
            <div>
                {communicationData.map((data) => {
                    return <p>Comment: {data.comment} <p>Date Applied: {data.time.split("T")[0]}</p></p> })}
            </div>
                ) : (null)}
            <h3>{job.company}</h3>
            <h4>{job.position}</h4>
                 <select id="select-button">
                 <option value="1" className="dropdownitem">Wishlist</option>
                 <option value="2" className="dropdownitem">Applied</option>
                <option value="3" className="dropdownitem">Interview</option>
                 </select>
                </div>
    )
}

export default JobCard;