import React, { useState, useEffect } from "react";
import { fetchTicket, ticketUpdation, createNewTicketByCustomer } from "../api/ticket";
import UpdateTicketModal from "../Components/Modal/UpdateTicketModal";
import TicketTable from "../Components/TableDetails/TicketTable";
import { Sidebar } from "./Sidebar";
import NewTicketModal from "../Components/Modal/NewTicketModal";
import StatusCard from "../Components/StatusCard";
import { getTicketsCount } from "../Utils/TicketCount";

function Customer() {
  const [ticketList, setTicketList] = useState([]);
  const [ticketUpdateCurr, setTicketUpdateCurr] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false)
  const [newTicketModal, setNewTicketModal] = useState(false)
  const [ticketsCount, setTicketsCount] = useState({});
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
  });
  const onCloseModal = () => {
    setTicketUpdateModal(false)
  }
  const cancelUpdate = (e) => {
    e.preventDefault()
    setTicketUpdateCurr("")
    setTicketUpdateModal(false)
  }

  useEffect(() => {
    listOfTicketList()
  }, [])

  const listOfTicketList = () => {
    fetchTicket().then(res => {
      if(res.status === 200){
        const tickets = res.data
        setTicketList(tickets)
        const countMap = getTicketsCount(tickets);
        setTicketsCount(countMap);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const editTicket = (rowData) => {
    const ticketData = { ...rowData }
    setTicketUpdateCurr(ticketData)
    setTicketUpdateModal(true)
    console.log(rowData);
  }

  const handleTicketChange = (e) => {
    const selectedTicket = { ...ticketUpdateCurr }
    if (e.target.name === "title")
      selectedTicket.title = e.target.value;
    if (e.target.name === "description")
      selectedTicket.description = e.target.value;
    if (e.target.name === "ticketPriority")
      selectedTicket.ticketPriority = e.target.value;
    setTicketUpdateCurr(selectedTicket)
  }

  const onTicketUpdate = (e) => {
    e.preventDefault();
    ticketUpdation(ticketUpdateCurr.id, ticketUpdateCurr)
      .then(res => {
        if (res.status === 200)
          onCloseModal();
        listOfTicketList();
      }).catch(err => {
        console.log(err);
      })
  }

  const openNewTicketModal = (e) => {
    e.preventDefault()
    setNewTicketModal(true)
  }

  const handleClose = () => {
    setNewTicketModal(false)
  }

  const handleCreateTicketChange = (e) => {
    const createTicket = { ...newTicket }
    if (e.target.name === "title")
      createTicket.title = e.target.value
    if (e.target.description === "description")
      createTicket.description = e.target.value

      setNewTicket(createTicket)
  }

  const createNewTicket = (e) => {
    createNewTicketByCustomer(newTicket).then(res => {
      if (res.status === 201) {
        handleClose()
        listOfTicketList()
      }
    }).catch(err => {
      console.log(err);
    })
    e.preventDefault()
  }

  return (
    <div >
      <Sidebar  />
      <div className="container text-center vw-100">
        <h2>Welcome_{localStorage.getItem("name")}</h2>
        <h5>User Type: {localStorage.getItem("userTypes")}</h5>
      </div>
      <div className="container">
      <StatusCard ticketsCount={ticketsCount} />
      </div>
      <div className="container">
        <TicketTable ticketList={ticketList} editTicket={editTicket} />

        {ticketUpdateModal && <UpdateTicketModal onCloseModal={onCloseModal} ticketUpdateModal={ticketUpdateModal} ticketUpdateCurr={ticketUpdateCurr} cancelUpdate={cancelUpdate} handleTicketChange={handleTicketChange} onTicketUpdate={onTicketUpdate} />}

        <button className="btn btn-success w-100 m-5" onClick={openNewTicketModal}>Raise A Ticket</button>

        {newTicketModal && <NewTicketModal newTicketModal={newTicketModal} openNewTicketModal={openNewTicketModal} handleClose={handleClose} setNewTicketModal={setNewTicketModal} newTicket={newTicket} setNewTicket={setNewTicket} handleCreateTicketChange={handleCreateTicketChange} createNewTicket={createNewTicket} />}
      </div>
    </div>
  );
}

export default Customer;