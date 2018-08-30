import { FETCH_USERS, FETCH_USERPROFILE } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {

        case FETCH_USERS:
        return _.mapKeys(action.payload.data, '_id');
        default: 
        return state;

        case FETCH_USERPROFILE:
        return { ...state, [action.payload.data._id]: console.log(action.payload.data)};
    }
}