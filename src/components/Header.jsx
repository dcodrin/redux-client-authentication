import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Signin from './authentication/Signin.jsx';


class Header extends React.Component {

    renderLinks() {
        const {authenticated} = this.props.auth;
        if (authenticated) {
            return [
                <li className="nav-item" key={'signout'}>
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>,
                <li className="nav-item" key={'protected'}>
                    <Link className="nav-link" to="/protectedRoute">See some stuff</Link>
                </li>
            ];
        } else {
            //Notice we are returning an array of <li>
            return [
                <li className="nav-item" key={'signin'}>
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={'signup'}>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light">
                    <Link to="/" className="navbar-brand">Redux Authentication</Link>
                    <ul className="nav navbar-nav">
                        {this.renderLinks()}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default connect(({auth})=> {
    return {
        auth
    };
})(Header);
