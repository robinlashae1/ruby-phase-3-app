import { useState } from "react";

function CommunicationForm({ application }) {
  const [communicationFormData, setCommunicationFormData] = useState({
    comment: '',
    received: false,
    time: new Date().toISOString().split('T')[0]
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
        ...communicationFormData,
        application_id: application.id,
        user_id: localStorage.getItem('user_id'),
        login_token: localStorage.getItem('login_token')
      })
    };
    fetch(`http://localhost:9292/communications`, options)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          // add data.data to state
        } else {
          setMessage(data.message);
        }
        console.log(data);
      });
  };

  const handleFormChange = (e) => {
    setCommunicationFormData(currentCommunicationFormData => (
      Object.assign({
        ...currentCommunicationFormData,
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
      })
    ))
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h4>Add Communication</h4>
      {message ? <div>{message}</div> : null}
      <label htmlFor="comment">Comment:</label>
      <input type="text" id="comment" name="comment" placeholder="comment" value={communicationFormData.comment} onChange={handleFormChange} />
      <label htmlFor="received">Incoming Communication?</label>
      <input type="checkbox" id="received" name="received" value={communicationFormData.received} onChange={handleFormChange} />
      <label htmlFor="time">Date:</label>
      <input type="date" id="time" name="time" value={communicationFormData.time} onChange={handleFormChange} />
      <input type="submit" value="Add Communication" />
    </form>
  );
}

export default CommunicationForm;