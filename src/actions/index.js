import axios from 'axios';
import {browserHistory} from'react-router';

import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, CLEAR_ERROR, FETCH_MESSAGE} from './types';

const API_URL = 'http://localhost:3000';


export const signInUser = ({email, password}) => {
    return (dispatch, getState) => {
        //Submit data to the server
        axios.post(`${API_URL}/signin`, {email, password}).then(res => {
            //If request is good
            //-- Update state to indicate user is authenticated
            dispatch(authUser());
            // Check if prior login errors were recorded
            if (getState().auth.error) {
                dispatch(clearError());
            }

            //-- Save the JWT token using localStorage
            localStorage.setItem('token', res.data.token);

            //-- Redirect to the route /protectedRoute
            browserHistory.push('/protectedRoute');

        }).catch(err => {
            //If bad request
            //-- Show an error to the user
            dispatch(authError('Bad login info'));
        });
    };
};

export const signUpUser = ({email, password}) => {
    return (dispatch, getState) => {
        //Submit data to server
        axios.post(`${API_URL}/signup`, {email, password}).then((res) => {
            dispatch(authUser());
            if (getState().auth.error) {
                dispatch(clearError());
            }
            localStorage.setItem('token', res.data.token);
            browserHistory.push('/protectedRoute');
        }).catch((err) => {
            dispatch(authError(err.data.error));
        });
    };
};

export const signOut = () => {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
};

export const authUser = () => {
    return {
        type: AUTH_USER
    };
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    };
};

export const authError = (err) => {
    return {
        type: AUTH_ERROR,
        payload: err
    };
};

export const setMessage = (message) => {
  return {
      type: FETCH_MESSAGE,
      payload: message
  };
};

export const fetchMessage = () => {
    return (dispatch, getState) => {
      axios.get(API_URL, {
          headers: {authorization: localStorage.getItem('token')}
      }).then((res) => {
          dispatch(setMessage(res.data.message));
      });
    };
};