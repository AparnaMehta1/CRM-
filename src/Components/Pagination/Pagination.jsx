import React from "react";
import "./pagination.css";

const Pagination = ({
  ticketPerPage,
  totalTicket,
  handlePaginate,
}) => {
  let pageNumber = [];

  for (let i = 1; i < Math.ceil(totalTicket / ticketPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className='page'>
      {pageNumber.map((number) => (
        <div className="mx-1">
          <p onClick={() => handlePaginate(number)}>{number}</p>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
