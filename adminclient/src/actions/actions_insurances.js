import axios from 'axios';
import {DELETE_USER_INSURANCE, POST_INSURANCE, POST_MESSAGE} from './types';

const POSTMESSAGE_URL = 'http://localhost:3000/customerprofile/message';
const POSTINSURANCES_URL = 'http://localhost:3000/application/save';
const DELETEINSURANCE_URL = 'http://localhost:3000/customerprofile/insurancedelete';
const POSTINVOICE_URL = 'http://localhost:3000/customerprofile/invoice';

/**
 * @desc Here you will find all the actions related to insurances
 */


// Post new message to user
export function postMessage(message) {
    return {
        type: POST_MESSAGE,
        message
    };
}

export function postMessages(values) {
    return (dispatch) => {
        return axios.post(`${POSTMESSAGE_URL}`, values)
            .then(res => {
                dispatch(postMessage(res.data))
            });
    }
}

// Post new invoice to user
export function postInvoice(value) {
    return {
        type: POST_INVOICES,
        value
    };
}

export function postInvoices(values) {
    return (dispatch) => {
        return axios.post(`${POSTINVOICE_URL}`, values)
            .then(res => {
                dispatch(postInvoice(res.data))
            });
    }
}

// Post new insurance to customer
export function postInsurance(insurances) {
    return {
        type: POST_INSURANCE,
        insurances
    };
}

export function postInsurances(values) {
    return (dispatch) => {
        return axios.post(`${POSTINSURANCES_URL}`, values)
            .then(res => {
                dispatch(postInsurance(res.data))
            });
    }
}

// Delete insurance from user by id
export function deleteInsuranceById(insurances) {
    return {
        type: DELETE_USER_INSURANCE,
        insurances
    };
}

export function deleteUserInsurance(id) {
    return (dispatch) => {
        return axios.post(`${DELETEINSURANCE_URL}`, id)
            .then(res => {
                dispatch(deleteInsuranceById(res.data))
            });
    }
}
