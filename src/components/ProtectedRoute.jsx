import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class ProtectedRoute extends React.Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(actions.fetchMessage());
    }

    render() {
        return (
            <div>
                <h1>You have access to many secretz here!</h1>
                <h3>The Secrete Message from the backend is: {this.props.secretMessage}</h3>
                <img src="../../cat_what.jpg" alt=""/>
            </div>
        );
    }
}

export default connect(({auth: {secretMessage}}) => {
    return {secretMessage};
})(ProtectedRoute);
