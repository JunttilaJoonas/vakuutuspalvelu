import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import {logoutUser} from '../actions/authActions';
import {connect} from 'react-redux';
import {Navbar} from "react-bootstrap";
import PropTypes from 'prop-types';


class LogOutTimer extends Component {

    constructor(props) {
        super(props)
        this.idleTimer = null
        this.onIdle = this._onIdle.bind(this)
        this.onActive = this._onActive.bind(this);
    }

    _onActive(e) {
        // user is active
        this.idleTimer.reset();
    }

    _onIdle(e) {

        //user is idle
        let elapsedTime = this.idleTimer.getElapsedTime();

        // log out if idle over 5 minutes
        if (elapsedTime > 1000 * 60 * 5) {
            this.props.logoutUser();
            this.props.history.push('/kirjaudu');
        }

        // TODO: replace console.log warning with a modal window (not alert because it stops the timer)
        else if (elapsedTime > 1000 * 15) {
            console.log("Olet ollut inaktiivisena 15 sekuntia. Sinut kirjataan automaattisesti ulos, jos et tee mitään 5 minuutin sisällä.")
        }
    }

    render() {
        return (
            <div>
                <IdleTimer
                ref={ref => {this.idleTimer = ref}}
                element={document}
                onIdle={this.onIdle}
                timeout={1000 * 15}
                />
                <IdleTimer
                    ref={ref => {this.idleTimer = ref}}
                    element={document}
                    onIdle={this.onIdle}
                    timeout={1000 * 60 * 5}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withRouter(LogOutTimer))