import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { Link , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserProfile } from '../../actions/actions_insurances'

class UpdateProfile extends Component {

    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        const initData = {
            "_id": this.props.user._id,
            "name": this.props.user.name,
            "email": this.props.user.email,
            "address": this.props.user.address,
            "city": this.props.user.city,
            "phone": this.props.user.phone
        };
        this.props.initialize(initData);
    }

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

    onSubmit(values) {
        // Kun formi on lähetetty ohjataan 
        // käyttäjä takaisin juureen
        
        this.props.updateUserProfile(values, () =>{
            this.props.history.push('/')
        })
     
    }


    render() {
        const { handleSubmit } = this.props;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Anna käyttäjän id"
                    placeholder="Id"
                    name="_id"
                    component={this.renderField} />
                <Field
                    label="Name"
                    placeholder="Nimi"
                    name="name"
                    component={this.renderField} />
                <Field
                    label="email"
                    placeholder="Sähköposti"
                    name="email"
                    component={this.renderField} />
                <Field
                    label="address"
                    placeholder="Osoite"
                    name="address"
                    component={this.renderField} />
                <Field
                    label="City"
                    placeholder="Kaupunki"
                    name="city"
                    component={this.renderField} />
                <Field
                    label="Phone"
                    placeholder="Puh"
                    name="phone"
                    component={this.renderField} />
                <button type="submit" className="btn btn-primary">Päivitä</button>
                <Link to="/" className="btn btn-danger">Poistu</Link>
            </form>
        );
    }
}

function validate(values) {
    
    const errors = {};

    if (!values.name) {
        errors.name = "Nimi ei voi olla tyhjä!";
    }

    if (!values.email) {
        errors.email = "Anna sähköposti!";
    }

    return errors;
}


const mapStateToProps = (state) => ({
    user: state.users
});

export default reduxForm({
    validate,
    form: 'ProfileUpdateForm' // Arvon pitää olla uniikki
})(
    connect(mapStateToProps,  { updateUserProfile })(UpdateProfile)
);