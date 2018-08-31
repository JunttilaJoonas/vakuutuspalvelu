import axios from 'axios';
export const FETCH_USERS = 'fetch_users';
export const FETCH_USERPROFILE = 'fetch_userprofile';
export const DELETE_USERPROFILE = 'delete_userprofile';
export const DELETE_USERINSURANCE = 'delete_userinsurance';
export const POST_INSURANCES = "post_insurances";
const ROOT_URL = 'http://localhost:3000/customerprofile/all';
const USERPROFILE_URL = 'http://localhost:3000/customerprofile/customer'
const USERINSURANCE_URL = 'http://localhost:3000/document/customer'
const DELETEINSURANCE_URL = 'http://localhost:3000/customerprofile/insurancedelete'


// Delete one insurance from user
export function deleteUserInsurance(id, callback) {
    console.log("ID:" + id);
    const request = axios.post(`${DELETEINSURANCE_URL}`, id)
    .then(() => callback());
    dispatch ({
        type: DELETE_USERINSURANCE,
        payload: request
    });
}

// Fetch all users 
export function fetchUsers() {
    const request = axios.get(ROOT_URL);
    return {
        type: FETCH_USERS,
        payload: request
    };
}

// Fetch one user by id
export function fetchUserProfile(id) {
    const request = axios.get(`${USERPROFILE_URL}/${id}`);
    return {
        type: FETCH_USERPROFILE,
        payload: request
    };
}

//Posts insurance

export function postInsurances(values, callback) {
    const request = axios.post('http://localhost:3000/document/create', values)
    .then(() => callback());
    return {
        type: POST_INSURANCES,
        payload: request
    }
}


// Delete user
export function deleteUserProfile(id, callback) {
    const request = axios.delete(`${USERPROFILE_URL}/${id}`)
    .then(() => callback());
    return {
        type: DELETE_USERPROFILE,
        payload: id
    };
}