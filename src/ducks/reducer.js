import axios from 'axios';
// import { access } from 'fs';

//change user to null when done testing...
const initialState = {
    user: null
}

const GET_USER = 'GET_USER'

export function getUser() {
    const user = axios.get('/auth/me').then(res => {
        return res.data;
    })
    return {
        type: GET_USER,
        payload: user
    }

}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
        return Object.assign({}, state, {user: action.payload})

        default:
        return state;

    }

}