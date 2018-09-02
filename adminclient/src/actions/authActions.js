import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
export const REGISTER_ADMIN = 'register_admin';
export const LOGIN_ADMIN = 'login_admin';
import { SET_CURRENT_USER } from './types';
const REGISTER_URL = 'http://localhost:3000/register';
const LOGIN_URL = 'http://localhost:3000/login';


export function registerUser(values, callback) {
    const request = axios.post(`${REGISTER_URL}`, values)
    .then(() => callback());
    return {
        type: REGISTER_ADMIN,
        payload: request
    };
}

export const loginUser = userData => dispatch => {
    axios.post(`${LOGIN_URL}`, userData)
    .then(res => {
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
}


export function setCurrentUser(decoded) {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

// Logout user
export const  logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    };


