import React from 'react';
import {reduxForm} from 'redux-form';

import * as actions from '../../actions/index';

class Signin extends React.Component {

    handleFormSubmit({email, password}) {
        const {dispatch} = this.props;
        dispatch(actions.signInUser({email, password}));
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        //Access handleSubmit helper from reduxForm
        //Attach props to each input field
        const {handleSubmit, fields: {email, password}} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label>Email</label>
                        <input {...email} className="form-control" type="email"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password</label>
                        <input {...password} className="form-control" type="password"/>
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div>
        );
    }
}



export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, ({auth: {error}}) => {return {errorMessage: error};})(Signin);
