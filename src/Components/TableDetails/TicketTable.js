import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import {AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import './ticketTable.css'
import '../../Styles/admin.css'

function TicketTable({ ticketList, editTicket, delTicket, filterTicketsBySearch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketPerPage] = useState(5);
  const [search, setSearch] = useState('')

  const indexOfLastTicket = currentPage * ticketPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketPerPage;
  const currentTickets = ticketList.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  const handlePaginate = (pageNumber)=>{
        setCurrentPage(pageNumber)
  }

  const handleSearch = ()=>{
    filterTicketsBySearch(search)
  }
  
  return (
    <div className="table">
        <h4 className='text-primary fw-bolder mt-3'>TICKET ID</h4>
        <input type="text" placeholder="Search" className="mb-2"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button onClick={()=>handleSearch()}>Search</button>
      <div className="ticket_Details">
        <div className="table_area">
        <table >
          <tr>
            <thead className="table_heading">
              <th>ID</th>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>REPORTER</th>
              <th>PRIORITY</th>
              <th>ASSIGNEE</th>
              <th>STATUS</th>
              <th>OPERATIONS</th>
            </thead>
            <tbody>
              {currentTickets?.map((item) => {
                const {id, title, description, reporter, ticketPriority, assignee, status} = item
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{description}</td>
                    <td>{reporter}</td>
                    <td>{ticketPriority}</td>
                    <td>{assignee}</td>
                    <td>{status}</td>
                    <td><AiOutlineEdit className="edit_icon" onClick={()=>editTicket(item)}/> <AiOutlineDelete onClick={()=>delTicket(id)} className="del_icon"/> </td>
                  </tr>
                );
              })}
            </tbody>
          </tr>
          <tfoot>
            <Pagination
              ticketPerPage={ticketPerPage}
              totalTicket={ticketList.length}
              handlePaginate={handlePaginate}
            />
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
}

export default TicketTable;
