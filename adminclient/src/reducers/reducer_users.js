import { GET_USERS, GET_USER_BY_ID, DELETE_USER_BY_ID, ADD_PROFILE_TO_USER } from '../actions/types';

export default function users(state = [], action)  {
    switch(action.type) {
        case GET_USERS:
        return action.users;
        default:
        return state;

        case GET_USER_BY_ID:
        return action.users;
        
        case ADD_PROFILE_TO_USER:
        return action.users;

        case DELETE_USER_BY_ID:
        return action.users;

    }
};