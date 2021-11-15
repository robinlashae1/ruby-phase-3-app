import React from 'react'

function JobCard({job}) {
    return (
        <div className="jobCards">
            <img src={job.logo_url} alt="Company logo" className="cardImage"/>
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