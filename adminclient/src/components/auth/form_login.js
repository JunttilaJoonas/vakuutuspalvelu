import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {

    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" placeholder={field.placeholder} {...field.input} />
                <div className="text-help">{field.meta.touched ? field.meta.error : ''}</div>
            </div>
        );
    }

    renderPasswordField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="password" placeholder={field.placeholder} {...field.input} />
                <div className="text-help">{field.meta.touched ? field.meta.error : ''}</div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        } 
    }


    onSubmit(values) {
        this.props.loginUser(values)
    }
    
    render() {
        const { handleSubmit } = this.props;

           return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Sähköposti"
                    placeholder="Anna sähköposti"
                    name="email"
                    component={this.renderField} />
                <Field
                    label="Salasana"
                    placeholder="Anna salasana"
                    name="password"
                    component={this.renderPasswordField} />
                <button type="submit" className="btn btn-primary">Kirjaudu</button>
            </form>
        );
    }
}

// Form validation for login
function validate(values) {
    
    const errors = {};

    if (!values.email) {
        errors.email = "Anna käyttäjätunnus!";
    }

    if (!values.password) {
        errors.password = "Anna salasana!";
    }

    return errors;
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default reduxForm({
    validate,
    form: 'AdminLoginForm' // Arvon pitää olla uniikki
})(
    connect(mapStateToProps, { loginUser })(withRouter(Login))
);
