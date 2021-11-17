import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CommunicationForm({ handleModal, addCommunication, updateCommunication, job, communication }) {
  console.log(communication);
  const [communicationFormData, setCommunicationFormData] = useState({
    comment: communication ? communication.comment : '',
    received: communication ? communication.received : false,
    time: communication ? communication.time.split("T")[0] : new Date().toISOString().split('T')[0]
  });
  const [message, setMessage] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: communication ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...communicationFormData,
        application_id: job.id,
        user_id: localStorage.getItem('user_id'),
        login_token: localStorage.getItem('login_token')
      })
    };
    const patchSuffix = communication ? `/${communication.id}` : '';
    fetch(`http://localhost:9292/communications${patchSuffix}`, options)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          communication ? updateCommunication(data.data) : addCommunication(data.data);
          handleModal({})
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
      <h4>{communication ? "Edit" : "Add"} Communication for {job.company} ({job.position})</h4>
      {message ? <div>{message}</div> : null}
      <fieldset>
        <label htmlFor="comment">Comment:</label>
        <input type="text" id="comment" name="comment" placeholder="comment" value={communicationFormData.comment} onChange={handleFormChange} />
        <label htmlFor="received">Incoming Communication?</label>
        <input type="checkbox" id="received" name="received" checked={communicationFormData.received} onChange={handleFormChange} />
        <label htmlFor="time">Date:</label>
        <input type="date" id="time" name="time" value={communicationFormData.time} onChange={handleFormChange} />
        <br />
        <span class="form-actions">
          <input type="submit" value={communication ? "Edit Communication" : "Add Communication"} />
          {communication && <DeleteForeverIcon />}
        </span>
      </fieldset>
    </form>
  );
}

export default CommunicationForm;