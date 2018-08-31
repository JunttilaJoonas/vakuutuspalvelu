import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { postInsurances } from '../actions'

class AddInsurance extends Component {

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
        
        this.props.postInsurances(values, () =>{
            
            this.context.history.push('/')
        })
     
    }


    render() {
        const { handleSubmit } = this.props;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Vakuutuksenottajan käyttäjätunnus"
                    placeholder="Anna vakuutuksenottajan käyttäjätunnus"
                    name="userid"
                    component={this.renderField} />
                <Field
                    label="Validi"
                    placeholder="Onko validi?"
                    name="valid"
                    component={this.renderField} />
                <Field
                    label="Vakuutuksen tyyppi"
                    placeholder="Anna vakuutuksen tyyppi"
                    name="insurancetype"
                    component={this.renderField} />
                <button type="submit" className="btn btn-primary">Lisää</button>
                <Link to="/" className="btn btn-danger">Poistu</Link>
            </form>
        );
    }
}


// Uuden ravintolan lisäämisen formin virhekäsittely

export default reduxForm({
    form: 'InsuranceNewForm' // Arvon pitää olla uniikki
})(
    connect(null, { postInsurances })(AddInsurance)
);