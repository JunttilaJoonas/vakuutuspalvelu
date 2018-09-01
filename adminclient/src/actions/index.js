import axios from 'axios';
export const FETCH_USERS = 'fetch_users';
export const FETCH_USERPROFILE = 'fetch_userprofile';
export const DELETE_USERPROFILE = 'delete_userprofile';
export const DELETE_USERINSURANCE = 'delete_userinsurance';
export const POST_INSURANCES = "post_insurances";
export const POST_MESSAGES = "post_messages";
export const POST_PROFILE = "post_profile";
export const UPDATE_USERPROFILE = 'update_userprofile';
const ROOT_URL = 'http://localhost:3000/customerprofile/all';
const USERPROFILE_URL = 'http://localhost:3000/customerprofile/customer';
const UPDATEPROFILE_URL = 'http://localhost:3000/customerprofile/updatecustomer';
const USERINSURANCE_URL = 'http://localhost:3000/document/customer';
const DELETEINSURANCE_URL = 'http://localhost:3000/customerprofile/insurancedelete';


// Update customer profile information
export function updateUserProfile(values, callback) {
    const request = axios.post(`${UPDATEPROFILE_URL}`, values)
    .then(() => callback());
    return {
        type: UPDATE_USERPROFILE,
        payload: request
    };
}

// Delete one insurance from user
export function deleteUserInsurance(id, callback) {
    const request = axios.post(`${DELETEINSURANCE_URL}`, id)
    .then(() => callback());
    return {
        type: DELETE_USERINSURANCE,
        payload: request
    };
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
    const request = axios.post('http://localhost:3000/application/save', values)
    .then(() => callback());
    return {
        type: POST_INSURANCES,
        payload: request
    }
}

export function postMessages(values, callback) {
    const request = axios.post('http://localhost:3000/customerprofile/message', values)
    .then(() => callback());
    return {
        type: POST_MESSAGES,
        payload: request
    }
}

export function postProfile(values, callback) {
    const request = axios.post('http://localhost:3000/customerprofile/addprofile', values)
    .then(() => callback());
    return {
        type: POST_PROFILE,
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