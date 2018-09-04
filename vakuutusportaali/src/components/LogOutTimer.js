import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {logoutUser} from '../actions/authActions';
import {connect} from 'react-redux';
import IdleTimer from 'react-idle-timer';


class LogOutTimer extends Component {

    constructor(props) {
        super(props);
        this.idleTimer = null;
        this.onIdle = this._onIdle.bind(this);
        this.onActive = this._onActive.bind(this);
        this.state = {
            warning: false,
        }
    }

    _onActive() {
        // user is active
        this.idleTimer.reset();
        if (this.state.warning === true) {
            this.setState({warning: false});
        }
    }

    _onIdle() {

        //user is idle
        let elapsedTime = this.idleTimer.getElapsedTime();

        // log out if idle over 5 minutes
        if (elapsedTime > 1000 * 60 * 5) {
            this.props.logoutUser();
            this.props.history.push('/kirjaudu');
        }

        else {
            this.setState({warning: true});
        }
    }

    render() {

        let warningMessage;

        if (this.state.warning) {
            warningMessage =
                <h3>Olet ollut inaktiivisena minuutin. Sinut kirjataan automaattisesti ulos, jos et tee mitään 4
                    minuutin sisällä.</h3>
        }

        return (
            <div>
                {warningMessage}
                <IdleTimer
                    ref={ref => {
                        this.idleTimer = ref
                    }}
                    element={document}
                    onIdle={this.onIdle}
                    onActive={this.onActive}
                    timeout={1000 * 60}
                />
                <IdleTimer
                    ref={ref => {
                        this.idleTimer = ref
                    }}
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