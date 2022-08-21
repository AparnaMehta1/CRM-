import React from 'react'
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";


function TicketTable({ticketList,  editTicket}) {

return (
    <div>
        <div className="ticket_Details">
        <h4>Tickte ID</h4>
            <MaterialTable 
            onRowClick={(event, rowData) => editTicket(rowData)}
                title="TICKET RECORDS"
                data={ticketList}
                
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
            />
        </div>

          
    </div>
  )
}

export default TicketTable