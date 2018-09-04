import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postMessages } from '../../actions/actions_insurances';

class AddMessage extends Component {

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
        // When submitted redirect user to '/'
        console.log("are we here?")  
        this.props.postMessages(values)
        this.props.history.push('/');     
    }


    render() {
        const { handleSubmit } = this.props;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Viestinsaajan käyttäjätunnus"
                    placeholder="Anna vakuutuksenottajan käyttäjätunnus"
                    name="id"
                    component={this.renderField} />
                <Field
                    label="Viesti"
                    placeholder="Onko validi?"
                    name="Message"
                    component={this.renderField} />
                <Field
                    label="Viestin lähettäjä"
                    placeholder="Anna vakuutuksen tyyppi"
                    name="Sender"
                    component={this.renderField} />
                <Field
                    label="Viestin id"
                    placeholder="Anna vakuutukselle tunnsu"
                    name="messageId"
                    component={this.renderField} />
                <button type="submit" className="btn btn-primary">Lisää</button>
                <Link to="/" className="btn btn-danger">Poistu</Link>
            </form>
        );
    }
}


const mapStateToProps = (state) => ({
    insurances: state.insurances,
    user: state.users
});

export default reduxForm({
    form: 'MessageNewForm' // Arvon pitää olla uniikki
})(
    connect(mapStateToProps, { postMessages })(withRouter(AddMessage))
);