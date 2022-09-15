import React from "react";
import { Modal } from "react-bootstrap";

function UpdateTicketModal({
  ticketUpdateModal,
  onCloseModal,
  ticketUpdateCurr,
  cancelUpdate,
  title,
  handleTicketChange,
  onTicketUpdate,
}) {
  return (
    <div>
      <Modal
        show={ticketUpdateModal}
        onHide={onCloseModal}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onTicketUpdate}>
            <div className="p-1">
              <h5 className="text-primary">
                Ticket ID : {ticketUpdateCurr.id}
              </h5>
              <div className="input-group">
                <label className="label input-group-text label-md">
                  {" "}
                  Title{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={ticketUpdateCurr.title}
                  onChange={handleTicketChange}
                />
              </div>
              <div className="input-group">
                <label className="label input-group-text label-md">
                  {" "}
                  Reporter{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="reporter"
                  value={ticketUpdateCurr.reporter}
                  onChange={handleTicketChange}
                />
              </div>
              <div className="input-group">
                <label className="label input-group-text label-md">
                  {" "}
                  TicketPriority{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="ticketPriority"
                  value={ticketUpdateCurr.ticketPriority}
                  onChange={handleTicketChange}
                />
              </div>
              <div className="input-group">
                <label className="label input-group-text label-md">
                  {" "}
                  Status{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="status"
                  value={ticketUpdateCurr.status}
                  onChange={handleTicketChange}
                />
              </div>
              <div className="input-group">
                <label className="label input-group-text label-md">
                  {" "}
                  Description{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={ticketUpdateCurr.description}
                  onChange={handleTicketChange}
                />
              </div>
              <div className="input-group">
                <label className="label input-group-text label-md">
                  {" "}
                  Assignee{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="assignee"
                  value={ticketUpdateCurr.assignee}
                  onChange={handleTicketChange}
                />
              </div>
              <button type="submit" className="btn btn-success my-1">
                Update
              </button>
              <button className="btn btn-secondary mx-2" onClick={cancelUpdate}>
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateTicketModal;
