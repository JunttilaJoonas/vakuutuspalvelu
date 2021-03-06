import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Grid, Panel, Button, Glyphicon, ListGroup, ListGroupItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { registerUser } from '../../actions/authActions';

class Register extends Component {

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
        
        this.props.registerUser(values, () =>{
            
            this.context.history.push('/')
        })
     
    }
    
    render() {
        const { handleSubmit } = this.props;

           return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="name"
                    placeholder="Anna nimi"
                    name="name"
                    component={this.renderField} />
                <Field
                    label="email"
                    placeholder="Anna sähköposti"
                    name="email"
                    component={this.renderField} />
                <Field
                    label="password"
                    placeholder="Anna salasana"
                    name="password"
                    component={this.renderField} />
                <Field
                    label="password2"
                    placeholder="Anna salasana"
                    name="password2"
                    component={this.renderField} />
                <button type="submit" className="btn btn-primary">Lisää</button>
                <Link to="/" className="btn btn-danger">Poistu</Link>
            </form>
        );
    }
}


export default reduxForm({
    form: 'AdminNewForm' // Arvon pitää olla uniikki
})(
    connect(null, { registerUser })(Register)
);
