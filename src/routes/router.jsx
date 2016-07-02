import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import {authUser} from '../actions/index';


import configureStore from '../store/configureStore';

import App from '../components/app.jsx';
import Signin from '../components/authentication/Signin.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Signout from '../components/authentication/Signout.jsx';
import Signup from '../components/authentication/Signup.jsx';
import HomePage from '../components/HomePage.jsx';


const store = configureStore();

//Check if token is present to set status as signedin
const token = localStorage.getItem('token');

if(token) {
    store.dispatch(authUser());
}


const checkLogin = (nextState, replace, next) => {
    if (store.getState().auth.authenticated) {
        replace('/');
    }
    next();
};

const redirectHomePage = (nextState, replace, next) => {
    if (!store.getState().auth.authenticated) {
        replace('/');
    }
    next();
};

const redirectLogin = (nextState, replace, next) => {
    if (!store.getState().auth.authenticated) {
        replace('/signin');
    }
    next();
};

export default () => {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={HomePage} />
                    <Route path="signin" component={Signin} onEnter={checkLogin}/>
                    <Route path="protectedRoute" component={ProtectedRoute} onEnter={redirectLogin}/>
                    <Route path="signout" component={Signout} onEnter={redirectHomePage}/>
                    <Route path="signup" component={Signup} onEnter={checkLogin}/>
                </Route>
            </Router>
        </Provider>
    );
};
