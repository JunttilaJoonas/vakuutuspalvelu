import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/customerprofile/all';
const USERPROFILE_URL = 'http://localhost:3000/customerprofile/customer';
const UPDATEPROFILE_URL = 'http://localhost:3000/customerprofile/updatecustomer';
const ADDPROFILE_URL = 'http://localhost:3000/customerprofile/addprofile';
const ADDUSER_URL =  'http://localhost:4000/profiili/register';
import { GET_USERS, GET_USER_BY_ID, DELETE_USER_BY_ID, POST_USER, ADD_PROFILE_TO_USER, UPDATE_USER_PROFILE } from './types';

/**
  * @desc Here you will find all the actions related to users.
*/

// Fetch all users from database
export function fetchUsers(users) {
        return {
            type: GET_USERS,
            users
        }
    };

export function fetchAllUsers() {
    return (dispatch) => {
        return axios.get(`${ROOT_URL}`)
        .then(res => {
            dispatch(fetchUsers(res.data))
        });
    }
}

// Fetch single user by id from database
export function fetchUserById(users) {
    return {
        type: GET_USER_BY_ID,
        users
    }
};

export function fetchUserProfile(id) {
    return (dispatch) => {
        return axios.get(`${USERPROFILE_URL}/${id}`)
        .then(res => {
            dispatch(fetchUserById(res.data))
        });
    }
}

// Delete user by id from database
export function deleteUserById(users) {
    return {
        type: DELETE_USER_BY_ID,
        users
    }
}

export function deleteUserProfile(id) {
    return (dispatch) => {
        return axios.delete(`${USERPROFILE_URL}/${id}`)
        .then(res => {
            dispatch(deleteUserById(res.data))
        });
    }
}

// Add profile to existing user in database
export function addProfile(profile) {
    return {
        type: ADD_PROFILE_TO_USER,
        profile
    };
}

export function postNewUser(values) {
    return {
        type: POST_USER,
        values
    };
}

// Add new user to database
export function postUser(values) {
    return (dispatch) => {
        return axios.post(`${ADDUSER_URL}`, values)
        .then(res => {
            dispatch(postNewUser(res.data))
        });
    }
}

export function postProfile(values) {
    return (dispatch) => {
        return axios.post(`${ADDPROFILE_URL}`, values)
        .then(res => {
            dispatch(addProfile(res.data))
        });
    }
}

// Update user profile information
export function updateProfile(profile) {
    return {
        type: UPDATE_USER_PROFILE,
        profile
    };
}

export function updateUserProfile(values) {
    return (dispatch) => {
        return axios.post(`${UPDATEPROFILE_URL}`, values)
        .then(res => {
            dispatch(updateProfile(res.data))
        });
    }
}





