import axios from 'axios';
export const FETCH_USERS = 'fetch_users';
export const FETCH_USERPROFILE = 'fetch_userprofile';
export const DELETE_USERPROFILE = 'delete_userprofile';
const ROOT_URL = 'http://localhost:3000/customerprofile/all';
const USERPROFILE_URL = 'http://localhost:3000/customerprofile/customer';

export function fetchUsers() {
    const request = axios.get(ROOT_URL);
    return {
        type: FETCH_USERS,
        payload: request
    };
}

export function fetchUserProfile(id) {
    const request = axios.get(`${USERPROFILE_URL}/${id}`);
    return {
        type: FETCH_USERPROFILE,
        payload: request
    };
}

export function deleteUserProfile(id, callback) {
    const request = axios.delete(`${USERPROFILE_URL}/${id}`)
    .then(() => callback());
    return {
        type: DELETE_USERPROFILE,
        payload: id
    };
}