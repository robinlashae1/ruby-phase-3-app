
import {useEffect, useState} from 'react';

function JobCard({job, communicationData, updateJob}) {
    const [value, setValue] = useState("default")
    const [dropdownDisabled, setDropdownDisabled] = useState(false);

    const handleChange = (e) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('user_id'),
                login_token: localStorage.getItem('login_token'),
                status: e.target.value
            })
        };
        setDropdownDisabled(true);
        fetch(`http://localhost:9292/applications/${job.id}`, options)
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    updateJob(data.data);
                } else {
                    console.log(data);
                }
                setDropdownDisabled(false);
            });
    };
  
      const [displayCommunication, setDisplayCommunication] = useState(false)

    function handleCommunication () {
        setDisplayCommunication(!displayCommunication)
    }
    return (
        <div className="jobCards">
            <img src={job.logo_url} alt="Company logo" className="cardImage"  onClick={handleCommunication} />
            <h3 className="jobText">{job.company}</h3>

            <h4>{job.position}</h4>
                 <select onChange={handleChange} id="select-button" value={job.status} disabled={dropdownDisabled}>
                {/* <option value="default" disabled hidden>Update?</option> */}
                 <option value="wishlist" className="dropdownitem">Wishlist</option>
                 <option value="pending" className="dropdownitem">Applied</option>
                <option value="interviewing" className="dropdownitem">Interviewing</option>
                <option value="offer made" className="dropdownitem">Offer Made</option>
                <option value="rejected" className="dropdownitem">Rejected</option>
                 </select>
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