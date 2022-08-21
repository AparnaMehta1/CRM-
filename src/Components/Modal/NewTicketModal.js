import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function NewTicketModal({ newTicketModal, handleClose, setNewTicketModal, handleCreateTicketChange, newTicket, createNewTicket }) {
  return (
    <div>
      <Modal show={newTicketModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={createNewTicket}>
          <div className="input-group">
            <label className="label input-group-text label-md"> Title </label>
            <input type="text" className="form-control" name="title" defaultValue={newTicket.title}  onChange={handleCreateTicketChange} />
            
          </div>
          <div className='input-group mb-3'>
            <label className='label input-group-text label-md '>
              DESCRIPTION
            </label>
            <textarea
              id='form16'
              className='md-textarea form-control'
              rows='3'
              name='description'
              placeholder='Description'
              required
              defaultValue={newTicket.description}
              onChange={handleCreateTicketChange}
            >
            
            </textarea>
          </div>
          <div className='input-group justify-content-center'>
            <div className='m-1'>
              <Button
                variant='secondary'
                onClick={() => {
                  setNewTicketModal({
                    title: "",
                    description: "",
                  });
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </div>
            <div className='m-1'>
              <Button type='submit' variant='primary'>
                Create
              </Button>
            </div>
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NewTicketModal