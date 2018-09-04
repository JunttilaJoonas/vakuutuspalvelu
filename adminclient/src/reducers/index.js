import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import users from './reducer_users';
import insurances from './reducer_insurances';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    users,
    insurances,
    auth: authReducer,
    form: formReducer,
    errors: errorReducer
});
