import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/customerprofile/all';
const USERPROFILE_URL = 'http://localhost:3000/customerprofile/customer';
const UPDATEPROFILE_URL = 'http://localhost:3000/customerprofile/updatecustomer';
const ADDPROFILE_URL = 'http://localhost:3000/customerprofile/addprofile';
import { GET_USERS, GET_USER_BY_ID, DELETE_USER_BY_ID, ADD_PROFILE_TO_USER, UPDATE_USER_PROFILE } from './types';

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

export function addProfile(profile) {
    return {
        type: ADD_PROFILE_TO_USER,
        profile
    };
}

export function postProfile(values) {
    return (dispatch) => {
        return axios.post(`${ADDPROFILE_URL}`, values)
        .then(res => {
            dispatch(addProfile(res.data))
        });
    }
}

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





