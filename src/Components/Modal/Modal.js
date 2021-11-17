import React from 'react'
import JobForm from './JobForm';

function Modal({modal, handleModal, addJob}) {
    // const modalClose = () => {
    //     setModalOpen(false)
    // }

    let content = null;
    if (modal === 'jobForm') {
        content = <JobForm handleModal={handleModal} addJob={addJob} />
    }
    return (
        <>
            <div className="modal-background" onClick={() => handleModal(false)}>
            </div>
            <div className="modal-content">
                {content}
            </div>
                {/* <div className="modal-container"></div>
                        <button onClick={modalClose}> X </button>
                    <div className="time">
                        <p>{data.time}</p>
                    </div>
                    <div className="received">{data.received}</div>
                    <div className="comment">{data.comment}</div>
            </div> */}
        </>
    )
}

export default Modal
