import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('dashboard');
        } 
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);
    }

    testAuth() {
        axios.get("http://localhost:4000/profiili/current")
        .then((res) => {console.log(res)});
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit} horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl 
                            value={this.state.email} 
                            onChange={this.onChange} 
                            type="email" 
                            name="email"
                            placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl 
                            value={this.state.password} 
                            onChange={this.onChange} 
                            type="password" 
                            name="password"
                            placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Sign in</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <button onClick={this.testAuth}> Submit </button>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps,  { loginUser })(Login);