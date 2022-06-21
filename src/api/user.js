import axios from 'axios'

// const BASE_URL = process.env.REACT_APP_SERVER_URL;

export async function getAllUsers() {
    return await axios.get(`https://relevel-crm--backend.herokuapp.com/crm/api/v1/users`, 
    {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    }
    )
}

export async function getUserData(userId, data) {
    return await axios.put(`https://relevel-crm--backend.herokuapp.com/crm/api/v1/users/${userId}`, data,  
    {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    },
    {
        "userId" : localStorage.getItem("userId")
    }
    )
}