import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signout extends React.Component {

    componentWillMount() {
        const {dispatch} = this.props;

        dispatch(actions.signOut());
    }

    render() {
        return (
            <div>
                <h1>You have successfully signed out! See you later alligator!</h1>
            </div>
        );
    }
}


export default connect()(Signout);
