import axios from 'axios';
export const FETCH_USERS = 'fetch-users';
const ROOT_URL = 'http://localhost:3000/customerprofile/all';

export function fetchUsers() {
    const request = axios.get(ROOT_URL);
    return {
        type: FETCH_USERS,
        payload: request
    };
}