import React, { useState, useEffect } from "react";
import { fetchTicket, ticketUpdation } from "../api/ticket";
import StatusCard from "../Components/StatusCard";
import UpdateTicketModal from "../Components/Modal/UpdateTicketModal";
import TicketTable from "../Components/TableDetails/TicketTable";
import { Sidebar } from "./Sidebar";
import { getTicketsCount } from "../Utils/TicketCount";

function Engineer() {
  const [ticketList, setTicketList] = useState([]);
  const [ticketUpdateCurr, setTicketUpdateCurr] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  const [ticketsCount, setTicketsCount] = useState({});

  const onCloseModal = () => {
    setTicketUpdateModal(false);
  };
  const cancelUpdate = (e) => {
    e.preventDefault();
    setTicketUpdateCurr("");
    setTicketUpdateModal(false);
  };

  useEffect(() => {
    listOfTicketList();
  }, []);

  const listOfTicketList = () => {
    fetchTicket()
      .then((res) => {
        if (res.status === 200) {
          const tickets = res.data;
          setTicketList(tickets);
          const countMap = getTicketsCount(tickets);
          setTicketsCount(countMap);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTicket = (rowData) => {
    const ticketData = { ...rowData };
    setTicketUpdateCurr(ticketData);
    setTicketUpdateModal(true);
    console.log(rowData);
  };

  const handleTicketChange = (e) => {
    const selectedTicket = { ...ticketUpdateCurr };
    if (e.target.name === "assignee") selectedTicket.assignee = e.target.value;
    if (e.target.name === "ticketPriority")
      selectedTicket.ticketPriority = e.target.value;
    setTicketUpdateCurr(selectedTicket);
  };

  const onTicketUpdate = (e) => {
    e.preventDefault();
    ticketUpdation(ticketUpdateCurr.id, ticketUpdateCurr)
      .then((res) => {
        if (res.status === 200) onCloseModal();
        listOfTicketList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delTicket = (id) => {
    const newTicketList = ticketList.filter((t) => {
      return t.id !== id;
    });
    setTicketList(newTicketList);
  };
  return (
    <>
      <Sidebar />
      <div className="container text-center">
        <h3>Welcome {localStorage.getItem("name")}</h3>
        <h6>User Type {localStorage.getItem("userTypes")}</h6>
        <div className="message">
          <p>Take a look a status of given below</p>
        </div>
        <div className="container">
          {ticketUpdateModal && (
            <UpdateTicketModal
              onCloseModal={onCloseModal}
              ticketUpdateModal={ticketUpdateModal}
              ticketUpdateCurr={ticketUpdateCurr}
              cancelUpdate={cancelUpdate}
              handleTicketChange={handleTicketChange}
              onTicketUpdate={onTicketUpdate}
            />
          )}
          <StatusCard ticketsCount={ticketsCount} />
          <div className="table_details mb-5">
          <TicketTable ticketList={ticketList} editTicket={editTicket} delTicket={delTicket} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Engineer;
