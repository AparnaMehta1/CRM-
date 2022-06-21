import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_SERVER_URL;

export async function fetchTicket(data) {
    return await axios.get('https://relevel-crm--backend.herokuapp.com/crm/api/v1/tickets', 
    {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    }, 
    {
        "userId" : localStorage.getItem('userId')
    }
    )
}


export async function ticketUpdation(id, ticketUpdateCurr) {
    return await axios.put(`https://relevel-crm--backend.herokuapp.com/crm/api/v1/tickets/${id}`, ticketUpdateCurr,
    {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    }, 
    {
        "userId" : localStorage.getItem('userId')
    }
    )
}