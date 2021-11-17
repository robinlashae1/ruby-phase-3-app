import { useState } from "react";

function JobForm() {
  const [jobFormData, setJobFormData] = useState({
    company: '',
    position: '',
    status: 'wishlist',
    logo_url: ''
  });
  const [message, setMessage] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...jobFormData,
        user_id: localStorage.getItem('user_id'),
        login_token: localStorage.getItem('login_token')
      })
    };
    fetch(`http://localhost:9292/applications`, options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          // Add data.data to state
        } else {
          setMessage(data.message);
        }
      })
  }

  const handleFormChange = (e) => {
    setJobFormData(currentJobFormData => Object.assign({...currentJobFormData, [e.target.name]: e.target.value}))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h4>Add Job Posting</h4>
      {message ? <div>{message}</div> : null}
      <label htmlFor="company">Company:</label>
      <input type="text" id="company" name="company" placeholder="company" value={jobFormData.company} onChange={handleFormChange} />
      <label htmlFor="logo_url">Logo URL:</label>
      <input type="text" id="logo_url" name="logo_url" placeholder="logo URL" value={jobFormData.logo_url} onChange={handleFormChange} />
      <label htmlFor="position">Position:</label>
      <input type="text" id="position" name="position" placeholder="position" value={jobFormData.position} onChange={handleFormChange} />
      <label htmlFor="status">Status:</label>
      <select id="status" name="status" value={jobFormData.status} onChange={handleFormChange}>
        <option value="wishlist">Wishlist</option>
        <option value="applied">Applied</option>
        <option value="pending">Pending</option>
        <option value="interviewing">Interviewing</option>
        <option value="offer">Offer Made</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
      <input type="submit" value="Add Posting" />
    </form>
  );
}

export default JobForm;