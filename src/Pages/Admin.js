import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Modal } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { fetchTicket, ticketUpdation } from "../api/ticket";
import {getAllUsers, getUserData} from '../api/user'
import "../Styles/admin.css"

export default function Admin() {
  const [userModal, setUserModal] = useState(false)
  const [ticketDetails, setTicketDetails] = useState([]); 
  const [userDetails, setUserDetails] = useState([]);
  const [ticketList, setTicketList] = useState({});
  const [ticketUpdateCurr, setTicketUpdateCurr] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  const [ticketCount, setTicketCount] = useState({});
  const [showTable, setShowTable] = useState(false)

  const updateSelectedCurrTicket = (data) => setTicketUpdateCurr(data)

  const onCloseTicketModal = ()=>{
    setTicketUpdateModal(false)
  }
  const showUserModal = () => {
    setUserModal(true)
  }
  const closeUserModal = () => {
    setUserModal(false)
  }

  useEffect(()=> {
    (async ()=> {
      fetchTickets()
      getAllUser()
    })()
  }, [])

  const updateTicketsCount = (tickets) => {
    const data = {
      pending: 0,
      closed: 0,
      open: 1,
      blocked: 0
    }
    tickets.forEach(x => {
      if (x.status === "OPEN")
        data.open += 1
      else if(x.status === "IN_PROGRESS") 
        data.pending += 1
        else if(x.status === "CLOSED")
        data.closed += 1
        else if(x.status === "BLOCKED")
        data.blocked += 1
    })
    setTicketCount(Object.assign({}, data))
  }

  const fetchTickets = () => {
    fetchTicket().then(function (response) {
      if(response.status === 200) {
        console.log(response);
        setTicketDetails(response.data);
        updateTicketsCount(response.data);
      }
    }).catch((error)=> {
      console.log(error);
    })
  }

  const getAllUser = (userId) => {
    getAllUsers(userId).then(function (response) {
      if(response.status === 200) {
        if(userId){
          setUserDetails(response.data);
        }else{
          setUserDetails(response.data);
        }
      }
    }).catch((error)=> {
      console.log(error);
    })
  }
 
  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(ticketUpdateCurr.id, ticketUpdateCurr).then(function (response) {
      console.log(response);
      console.log("Ticket updated successfully");
      onCloseTicketModal();
      fetchTickets();
    }).catch(function (error) {
      console.log(error);
    })
  }
  

  const editTicket = (ticketList) => {
    const ticket = {
      assignee: ticketList.assignee,
      description: ticketList.description,
      id: ticketList.id,
      reporter: ticketList.reporter,
      status: ticketList.status,
      ticketPriority: ticketList.ticketPriority,
      title: ticketList.title
    }
    console.log(ticket);
    // storing the existing values that we grabbed in a state
    setTicketUpdateCurr(ticket);
    // open a modal 
    setTicketUpdateModal(true);
  }
  const onTicketUpdate = (e) => {
    if (e.target.name === "title") {
      ticketUpdateCurr.title = e.target.value
    }
    else if(e.target.name === "description"){
      ticketUpdateCurr.description = e.target.value
    }
    updateSelectedCurrTicket(Object.assign({}, ticketUpdateCurr))
  }
  console.log(ticketCount);

  const userDetail =()=>{
    setShowTable(true)
  }
  const adminDetail = ()=>{
    setShowTable(false)
  }

  return (
    <div className="vh-100">
      <div className="row">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="container col m-1">
          <h3 className="text-primary text-center text-light">Welcome Admin</h3>
          <p className="text-center text-light">Take a quick look at your stats below</p>

          {/* STATS CARDS START HERE */}
          <div className="container">
          <div className="row my-5 mx-2 text-center">
            <div className="col my-1 p-2">
              <div className="card" style={{ width: 12 + 'rem' }}>
                <div className="box borders_b">
                  <h5 className="card-subtitle my-1 fw-bold text-success">
                    <BorderColorIcon/>
                    Open
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">{ticketCount.open}</div>
                    <div className="col my-1">
                      <div style={{ height: 30, width: 30 }}>
                        <CircularProgressbar value={ticketCount.open}
                          styles={buildStyles({
                            textColor: "green",
                            pathColor: "darkGreen",
                          })} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <div className="col my-1 p-2 ">
              <div className="card" style={{ width: 12 + 'rem' }}>
                <div className="box1 cardbody borders_y">
                  <h5 className="card-subtitle my-1 fw-bold text-danger">
                    <AutorenewIcon className="text-danger bg-opacity-25" />
                    Progress
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">{ticketCount.pending}</div>
                    <div className="col my-1">
                      <div style={{ height: 30, width: 30 }}>
                        <CircularProgressbar value={ticketCount.pending}
                          styles={buildStyles({
                            textColor: "red",
                            pathColor: "Red",
                          })} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <div className="col my-1 p-2 ">
              <div className="card bg-success bg-opacity-25 " style={{ width: 12 + 'rem' }}>
                <div className="box2 cardbody borders_c">
                  <h5 className="card-subtitle my-1 fw-bold text-success">
                    <CheckCircleOutlineIcon className="" />
                    Closed
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">{ticketCount.closed}</div>
                    <div className="col my-1">
                      <div style={{ height: 30, width: 30 }}>
                        <CircularProgressbar value={ticketCount.closed}
                          styles={buildStyles({
                            textColor: "green",
                            pathColor: "Green",
                          })} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <div className="col my-1 p-2 ">
              <div className="card bg-primary bg-opacity-10" style={{ width: 12 + 'rem' }}>
                <div className="box3 cardbody borders_b">
                  <h5 className="card-subtitle my-1 fw-bold">
                    <BlockIcon />
                    Blocked
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">{ticketCount.blocked}</div>
                    <div className="col my-1">
                      <div style={{ height: 30, width: 30 }}>
                        <CircularProgressbar value={ticketCount.blocked}
                          styles={buildStyles({
                            textColor: "blue",
                            pathColor: "darkBlue",
                          })} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
          </div>
          <hr />

            {!showTable ? 
          <div className="container">
          <center><button onClick={userDetail} className="btn btn-lg fw-bolder text-light">User Details</button></center>
            <div className="table">
             <MaterialTable
          onRowClick={(event, ticketList) => editTicket(ticketList)}
              columns={[
                {
                  title: 'Ticket ID',
                  field: 'id'
                },

                {
                  title: 'TITLE',
                  field: 'title'
                },
                {
                  title: 'Description',
                  field: 'description'
                },
                {
                  title: 'Reporter',
                  field: 'reporter'
                },
                {
                  title: 'Priority',
                  field: 'ticketPriority'
                },
                {
                  title: 'Assignee',
                  field: 'assignee'
                },
                {
                  title: "Status",
                  field: "status",
                  lookup: {
                    "OPEN": "OPEN",
                    "IN_PROGRESS": "IN_PROGRESS",
                    "BLOCKED": "BLOCKED",
                    "CLOSED": "CLOSED"
                  }
                }
              ]}
              options={{
                exportMenu: [{
                  label: 'Export Pdf',
                  exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Ticket Records')
                },
                {
                  label: 'Export Csv',
                  exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Ticket Records')
                },
                ],
                headerStyle: {
                  backgroundColor: 'darkblue',
                  color: "#fff"
                },
                rowStyle: {
                  backgroundColor: "#eee"
                }
              }}
              data={ticketDetails}

              title="TICKET RECORDS"
            />
            </div>
          </div>
              :
          <div className="container">
          <center><button onClick={adminDetail} className="btn fw-bolder btn-lg text-light">Admin Details</button></center>
            <div className="table">
            <MaterialTable

        // onRowClick={(rowData, userId)=> getAllUser(rowData.userId)}

              columns={[
                {
                  title: 'User ID',
                  field: 'userId'
                },

                {
                  title: 'E-mail',
                  field: 'email'
                },
                {
                  title: 'Name',
                  field: 'name'
                },
                {
                  title: "User Types",
                  field: "userTypes",
                  lookup: {
                    "ENGINEER": "ENGINEER",
                    "CUSTOMER": "CUSTOMER",
                    "ADMIN": "ADMIN",
                    "CLOSED": "CLOSED"
                  }
                },
                {
                  title: "User Status",
                  field: "userStatus",
                  lookup: {
                    "APPROVED": "APPROVED",
                    "IN_PROGRESS": "IN_PROGRESS",
                    "BLOCKED": "BLOCKED",
                    "CLOSED": "CLOSED"
                  }
                }
              ]}
              options={{
                exportMenu: [{
                  label: 'Export Pdf',
                  exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Ticket Records')
                },
                {
                  label: 'Export Csv',
                  exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Ticket Records')
                }],
                headerStyle: {
                  backgroundColor: 'darkblue',
                  color: "#fff"
                },
                rowStyle: {
                  backgroundColor: "#eee"
                }
              }}
              data={userDetails}

              title="USER RECORDS"
            />
            </div>
          </div>
            }

          {ticketUpdateModal ? (
            <Modal
              show={ticketUpdateModal}
              onHide={onCloseTicketModal}
              backdrop="static"
              centered >
              <Modal.Header closeButton>
                <Modal.Title>Update Ticket</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={updateTicket}>
                  <div className="p-1">
                    <h5 className="text-primary">Ticket ID :{ticketUpdateCurr.id}</h5>
                    <div className="input-group">
                      <label className="label input-group-text label-md"> Title </label>
                      <input type="text" className="form-control" name="title" value={ticketUpdateCurr.title} onChange={onTicketUpdate} />
                    </div>
                    <div className="input-group">
                      <label className="label input-group-text label-md"> Description </label>
                      <input type="text" className="form-control" name="description" value={ticketUpdateCurr.description} onChange={onTicketUpdate} />
                    </div>
                    <button type="submit" className="btn btn-success my-1">Update</button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          ) : ("")}
        </div>
      </div>
    </div>
  )
}
