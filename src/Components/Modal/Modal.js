import React from 'react'

function Modal({data, setModalOpen}) {
    const modalClose = () => {
        setModalOpen(false)
    }
    return (
        <div className="modal-background">
            <div className="modal-container"></div>
                    <button onClick={modalClose}> X </button>
                <div className="time">
                    <p>{data.time}</p>
                </div>
                <div className="received">{data.received}</div>
                <div className="comment">{data.comment}</div>
        </div>
    )
}

export default Modal
