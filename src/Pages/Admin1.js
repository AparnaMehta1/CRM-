import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import StatusCard from "../Components/StatusCard";
import TicketTable from "../Components/TableDetails/TicketTable";
import { fetchTicket, ticketUpdation } from "../api/ticket";
import UpdateTicketModal from "../Components/Modal/UpdateTicketModal";
import UserTable from "../Components/TableDetails/UserTable";
import { getAllUsers } from "../api/user";
import UserModal from "../Components/Modal/UserModal";
import { getTicketsCount } from "../Utils/TicketCount";

function Admin() {
  const [ticketList, setTicketList] = useState([]);
  const [ticketUpdateCurr, setTicketUpdateCurr] = useState({});
  const [userList, setUserList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [ticketsCount, setTicketsCount] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [loader, setLoader] = useState(false);

  // we have added a button on Modal with the name of cancel when we click on that it will set the previous value without any change and will close the modal
  const cancelUpdate = (e) => {
    e.preventDefault();
    setTicketUpdateCurr("");
    setTicketUpdateModal(false);
    setUserDetails("");
    setUserModal(false);
  };

  //here we have a cross button on Modal when we click on that it will simply close the Modal
  const onCloseModal = () => {
    setTicketUpdateModal(false);
    setUserModal(false);
  };

  useEffect(() => {
    listOfTicket();
    listOfUsers("");
  }, []);

  // Fetcing the ticket here from the api which we have created
  const listOfTicket = () => {
    setLoader(true);
    fetchTicket()
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          const tickets = response.data;
          setTicketList(tickets);
          setLoader(false);
          const countMap = getTicketsCount(tickets);
          setTicketsCount(countMap);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Here we are try to edit the ticket details when we click on any row it will open up a modal
  const editTicket = (rowData) => {
    const ticketData = { ...rowData };
    setTicketUpdateCurr(ticketData);
    setTicketUpdateModal(true);
    console.log(ticketData);
  };

  // Here we are grabbing the value what we are changing in the input box
  const handleTicketChange = (e) => {
    const selectedTicket = { ...ticketUpdateCurr };
    if (e.target.name === "title") 
      selectedTicket.title = e.target.value;
    if (e.target.name === "description")
      selectedTicket.description = e.target.value;
    if (e.target.name === "ticketPriority")
      selectedTicket.ticketPriority = e.target.value;
    if (e.target.name === "reporter") 
      selectedTicket.reporter = e.target.value;
    if (e.target.name === "status") 
      selectedTicket.status = e.target.value;
    if (e.target.name === "userTypes")
      selectedTicket.userTypes = e.target.value;
    setTicketUpdateCurr(selectedTicket);
  };

  // finally we are going to call the api to update the data in databse which we have changed
  const onTicketUpdate = (e) => {
    ticketUpdation(ticketUpdateCurr.id, ticketUpdateCurr)
      .then((res) => {
        if (res.status === 200) onCloseModal();
        listOfTicket();
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  // here we are going to fecth the user list
  const listOfUsers = () => {
    getAllUsers()
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //now we are trying to get the data when we click on any row
  const editUserDetails = (rowData) => {
    const userData = { ...rowData };
    setUserDetails(userData);
    setUserModal(true);
    console.log(userData);
  };

  const handleChangeUserData = (e) => {
    const selectedUser = { ...userDetails };
    if (e.target.name === "userName") selectedUser.userName = e.target.value;
    if (e.target.name === "status") selectedUser.status = e.target.value;
    if (e.target.name === "userTypes") selectedUser.userTypes = e.target.value;

    setUserDetails(selectedUser);
  };

  const delTicket = (id)=>{
      const newTicketList = ticketList.filter((t)=>{
        return t.id !== id
      })
      setTicketList(newTicketList)
  }

  return (
    <div>
      <Sidebar />
      <div className="container main_section text-center">
        <h3>Welcome {localStorage.getItem("name")}</h3>
        <h6>User Type: {localStorage.getItem("userTypes")}</h6>
        <div className="message">
          <p>Take a look a status of given below</p>
        </div>
        <div class="container-fluid ">
          <div className="list">
            <StatusCard ticketsCount={ticketsCount} />
          </div>
        </div>
        {loader ? (
          <img src="https://i.pinimg.com/originals/f9/41/ae/f941ae9d16fd7d2957eea6e5b1100d1e.gif" />
        ) : (
          <TicketTable
            ticketList={ticketList}
            setTicketList={setTicketList}
            setTicketUpdateCurr={setTicketUpdateCurr}
            editTicket={editTicket}
            listOfTicket={listOfTicket}
            delTicket={delTicket}
          />
        )}
        {loader ? (
          <img src="https://i.pinimg.com/originals/f9/41/ae/f941ae9d16fd7d2957eea6e5b1100d1e.gif" />
        ) : (
          <div className="my-3">
            <UserTable
              userList={userList}
              editUserDetails={editUserDetails}
              userDetails={userDetails}
            />
          </div>
        )}

        {userModal && (
          <UserModal
            userModal={userModal}
            onCloseModal={onCloseModal}
            cancelUpdate={cancelUpdate}
            userDetails={userDetails}
            handleChangeUserData={handleChangeUserData}
          />
        )}

        {ticketUpdateModal && (
          <UpdateTicketModal
            onCloseModal={onCloseModal}
            ticketUpdateModal={ticketUpdateModal}
            ticketUpdateCurr={ticketUpdateCurr}
            cancelUpdate={cancelUpdate}
            title={"Update Ticket"}
            handleTicketChange={handleTicketChange}
            onTicketUpdate={onTicketUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default Admin;
