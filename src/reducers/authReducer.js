import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, CLEAR_ERROR, FETCH_MESSAGE} from '../actions/types';

export default (state = {authenticated: false}, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {...state, error: null, authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERROR:
            return {...state, error: action.payload};
        case CLEAR_ERROR:
            return {...state, error: null};
        case FETCH_MESSAGE:
            return {...state, secretMessage: action.payload};
        default:
            return state;
    }
};