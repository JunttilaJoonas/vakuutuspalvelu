import React, { Component } from 'react'
import IdleTimer from 'react-idle-timer'
import {logoutUser} from "../actions/authActions";
import {connect} from "react-redux";
import {Navbar} from "react-bootstrap";
import PropTypes from 'prop-types';


export class LogOutTimer extends Component {

    _onIdle(e) {
        alert("Olet ollut passiivisena 5 minuuttia.")
    }

    render() {
        console.log("state",this.state);
        return (
            <IdleTimer
                ref={ref => { this.idleTimer = ref }}
                element={document}
                onIdle={this._onIdle.bind(this)}
                timeout={1000 * 60 * 5}/>
        )
    }
}