import {
    ADD_PROFILE_TO_USER,
    DELETE_USER_BY_ID,
    GET_USER_BY_ID,
    GET_USERS,
    POST_USER,
    UPDATE_USER_PROFILE
} from '../actions/types';

export default function users(state = [], action) {

    /**
     * @desc Action types for user handling
     */

    switch (action.type) {

        // Get all users
        case GET_USERS:
            return action.users;
        default:
            return state;

        // Get one user by id
        case GET_USER_BY_ID:
            return action.users;

        // Add new user
        case POST_USER:
            return action.users;

        // Add profile to new user
        case ADD_PROFILE_TO_USER:
            return action.users;

        // Delete user 
        case DELETE_USER_BY_ID:
            return action.users;

        // Update user information
        case UPDATE_USER_PROFILE:
            return action.users;

    }
};