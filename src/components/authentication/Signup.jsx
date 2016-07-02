import React from 'react';
import {reduxForm} from  'redux-form';
import * as actions from '../../actions';

class Signup extends React.Component {

    handleFormSubmit({email, password}) {
        //redux-form handleSubmit will pass to our function all the props from the form
        //Call action creator to sign up user

        const {dispatch} = this.props;
        dispatch(actions.signUpUser({email, password}));
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

        const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" {...email}/>
                        {email.touched && email.error && <div className="error">{email.error}</div>}
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" {...password}/>
                        {password.touched && password.error && <div className="error">{password.error}</div>}
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" className="form-control" {...passwordConfirm}/>
                        {passwordConfirm.touched && passwordConfirm.error &&
                        <div className="error">{passwordConfirm.error}</div>}
                    </fieldset>
                    {this.renderAlert()}
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        );
    }
}

//validate will be passed an object with all the properties from the form
// ex: {email: 'test', password: 'test' , passwordConfirm: 'test'}
//If validate returns an empty object it means all tests pass
//If some test fails return a NEW object with the properties that failed and attach
// a message on those keys to display to the user through another dom element
//If the form is not valid handleSubmit will not be called
function validate(formProps) {
    //console.log(formProps);
    const errors = {};

    Object.keys(formProps).forEach((key) => {
        if (!formProps[key]) {
            switch (key) {
                case 'email':
                    errors[key] = 'Please enter an email.';
                    break;
                case 'password':
                    errors[key] = 'Please enter a password.';
                    break;
                case 'passwordConfirm':
                    errors[key] = 'Please enter password confirmation';
                    break;
            }
        }
    });

    //console.log(errors);

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match!';
    }
    return errors;
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, ({auth: {error}}) => {return {errorMessage: error};})(Signup);
