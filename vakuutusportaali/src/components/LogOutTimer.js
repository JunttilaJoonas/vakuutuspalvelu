import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import {logoutUser} from '../actions/authActions';
import {connect} from 'react-redux';
import {Navbar} from "react-bootstrap";
import PropTypes from 'prop-types';


class LogOutTimer extends Component {
    

    _onIdle() {
        this.props.logoutUser();
        this.props.history.push('/kirjaudu');
    }

    render() {
        return (
            <IdleTimer
                ref={ref => { this.idleTimer = ref }}
                element={document}
                onIdle={this._onIdle.bind(this)}
                timeout={5000 * 200}/>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, { logoutUser })(withRouter(LogOutTimer))