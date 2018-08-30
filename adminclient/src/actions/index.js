import axios from 'axios';
export const FETCH_USERS = 'fetch_users';
export const FETCH_USERPROFILE = 'fetch_userprofile';
const ROOT_URL = 'http://localhost:3000/customerprofile/all';
const USERPROFILE_URL = 'http://localhost:3000/customerprofile'

export function fetchUsers() {
    const request = axios.get(ROOT_URL);
    return {
        type: FETCH_USERS,
        payload: request
    };
}

export function fetchUserProfile(id) {
    const request = axios.get(`${USERPROFILE_URL}/customer/${id}`);
    return {
        type: FETCH_USERPROFILE,
        payload: request
    };
}