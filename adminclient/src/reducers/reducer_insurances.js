import {DELETE_USER_INSURANCE, POST_INSURANCE, POST_INVOICE, POST_MESSAGE} from '../actions/types';

export default function insurances(state = [], action) {

    /**
     * @desc Action types for insurance handling
     */

    switch (action.type) {

        // Delete insurance from user
        case DELETE_USER_INSURANCE:
            return action.insurances;
        default:
            return state;

        // Add insurance to customer
        case POST_INSURANCE:
            return action.insurances;

        // Post message to customer
        case POST_MESSAGE:
            return action.insurances;

        // Post invoice to customer
        case POST_INVOICE:
            return action.insurances;

    }
};