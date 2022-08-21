import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function UserModal({ userModal, onCloseModal, userDetails, cancelUpdate, handleChangeUserData }) {
  return (
    <div>
      <Modal
        show={userModal}
        onHide={onCloseModal}
        backdrop="static"
        keyboard={false}
        centered >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <div className="p-1">
              <h5 className="card-subtitle mb-2 text-primary lead">User ID: {userDetails.userId}</h5>
              <hr />
              <div className="input-group mb-3">
                <label className="label input-group-text label-md ">Name</label>
                <input type="text" className="form-control" name="userName" value={userDetails.name} onChange={handleChangeUserData} />
              </div>
              <div className="input-group mb-3">
                <label className="label input-group-text label-md ">Email</label>
                <input type="email" className="form-control" name="email" value={userDetails.email} />
              </div>
              <div className="input-group mb-3">
                <label className="label input-group-text label-md ">Type</label>
                <select className="form-select" name="userTypes" value={userDetails.userTypes} onChange={handleChangeUserData}>
                  <option value="ADMIN">ADMIN</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ENGINEER">ENGINEER</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <label className="label input-group-text label-md ">Status</label>
                <select name="status" className="form-select"
                  value={userDetails.userStatus} onChange={handleChangeUserData}>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>
            </div>
            <div className="input-group justify-content-center">
              <div className="m-1">
                <Button variant="secondary" onClick={cancelUpdate}>
                  Cancel
                </Button>
              </div>
              <div className="m-1">
                <Button variant="primary">Update</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UserModal