import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_SERVER_URL;

export async function userSignup(data) {
    return await axios.post('https://relevel-crm--backend.herokuapp.com/crm/api/v1/auth/signup', data);
}

export async function userSignin(data) {
    return await axios.post('https://relevel-crm--backend.herokuapp.com/crm/api/v1/auth/signin', data);
}
