import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { postProfile } from '../actions'

class AddProfile extends Component {

    state = {
        profile: []
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
        
        this.props.postProfile(values, () =>{
            
            this.context.history.push('/')
        })
     
    }



    render() {
        console.log(profile)
        const { handleSubmit } = this.props;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Name"
                    placeholder="Anna vakuutuksenottajan käyttäjätunnus"
                    name="name"
                    component={this.renderField} />
                <Field
                    label="email"
                    placeholder="Onko validi?"
                    name="email"
                    component={this.renderField} />
                <Field
                    label="address"
                    placeholder="Anna vakuutuksen tyyppi"
                    name="address"
                    component={this.renderField} />
                <Field
                    label="City"
                    placeholder="Anna vakuutukselle tunnsu"
                    name="city"
                    component={this.renderField} />
                <Field
                    label="Phone"
                    placeholder="Anna vakuutukselle tunnsu"
                    name="phone"
                    component={this.renderField} />
                <button type="submit" className="btn btn-primary">Lisää</button>
                <Link to="/" className="btn btn-danger">Poistu</Link>
            </form>
        );
    }
}


// Uuden ravintolan lisäämisen formin virhekäsittely

export default reduxForm({
    form: 'ProfileNewForm' // Arvon pitää olla uniikki
})(
    connect(null, { postProfile })(AddProfile)
);