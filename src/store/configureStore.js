import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers/index';

export default (initialState = {}) => {
    return createStore(reducers, initialState, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
};

