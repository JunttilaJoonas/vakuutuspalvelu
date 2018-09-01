import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
export const REGISTER_ADMIN = 'register_admin';
export const LOGIN_ADMIN = 'login_admin';
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

export function loginUser(userData) {
    return axios.post(`${LOGIN_URL}`, userData)
    .then((res) => { 
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        console.log("Decoded: ", decoded);
        dispatch(setCurrentUser(decoded));
    return {
        type: LOGIN_ADMIN,
        payload: request
    };
})
}


export function setCurrentUser(decoded) {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}


