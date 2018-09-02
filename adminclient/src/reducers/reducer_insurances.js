import { DELETE_USER_INSURANCE, POST_INSURANCE, POST_MESSAGE } from '../actions/types';

export default function insurances(state = [], action)  {
    switch(action.type) {
        case DELETE_USER_INSURANCE:
        return action.insurances;
        default:
        return state;

        case POST_INSURANCE:
        return action.insurances;

        case POST_MESSAGE:
        return action.insurances;

    }
};