import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import {AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import './userTable.css'

function UserTable({ userList, editUserDetails, filterUsersBySearch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketPerPage] = useState(35);
  const [search, setSearch] = useState('')

  const indexOfLastTicket = currentPage * ticketPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketPerPage;
  const currentTickets = userList.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  const handlePaginate = (pageNumber)=>{
        setCurrentPage(pageNumber)
  }

  const handleSearch = ()=>{
    filterUsersBySearch(search)
  }

  return (
    <div className="table my-3">
        <h4 className='text-primary fw-bolder mt-3'>USER DATA</h4>
        <input type="text" placeholder="Search" className="mb-2"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button onClick={()=>handleSearch()}>Search</button>
      <div className="userticket_Details">
        <div className="usertable_area">
        <table >
          <tr className='table_data'>
            <thead className="table_heading">
              <th>USER ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>User Types</th>
              <th>User Status</th>
              <th>OPERATION</th>
            </thead>
            <tbody>
              {currentTickets?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.userId}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.userTypes}</td>
                    <td>{item.userStatus}</td>
                    <td><AiOutlineEdit onClick={()=>editUserDetails(item)}/> <AiOutlineDelete /> </td>
                  </tr>
                );
              })}
            </tbody>
          </tr>
          <tfoot>
            <Pagination
              ticketPerPage={ticketPerPage}
              totalTicket={userList.length}
              handlePaginate={handlePaginate}
            />
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
