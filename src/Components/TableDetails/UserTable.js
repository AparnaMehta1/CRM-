import React from 'react'
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function UserTable({userList, editUserDetails}) {
  return (
    <div>
    <h4>User Details</h4>
        <MaterialTable 
        onRowClick={(event, rowData) => editUserDetails(rowData)}
        data={userList}
        title="User Records"
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
        />
    </div>
  )
}

export default UserTable