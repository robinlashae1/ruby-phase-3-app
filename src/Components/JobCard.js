import {useEffect, useState} from 'react';

function JobCard({job}) {
    const [value, setValue] = useState("default")

    const handleChange = (e) => {
        setValue(e.target.value);
      };
    return (
        <div className="jobCards">
            <img src={job.logo_url} alt="Company logo" className="cardImage"/>
            <h3 className="jobText">{job.company}</h3>
            <h4>{job.position}</h4>
                 <select onChange={handleChange} id="select-button">
                <option value="default" disabled hidden>Update?</option>
                 <option value="1" className="dropdownitem">Wishlist</option>
                 <option value="2" className="dropdownitem">Applied</option>
                <option value="3" className="dropdownitem">Interview</option>
                <option value="4" className="dropdownitem">Rejected</option>
                 </select>
        </div>
    )
}

export default JobCard;