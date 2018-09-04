import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postInvoices } from '../../actions/actions_insurances';

class AddInvoice extends Component {

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
        this.props.postInvoices(values)
        this.props.history.push('/');     
    }


    render() {
        const { handleSubmit } = this.props;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Vakuutustyyppi"
                    placeholder="Anna vakuutustyyppi"
                    name="insurancetype"
                    component={this.renderField} />
                <Field
                    label="Eräpäivä"
                    placeholder="Anna eräpäivä"
                    name="duedate"
                    component={this.renderField} />
                <Field
                    label="Viitenumero"
                    placeholder="Anna viitenumero"
                    name="referencenumber"
                    component={this.renderField} />
                <Field
                    label="Käyttäjätili"
                    placeholder="Anna vakuutuksenottajan tunnus"
                    name="userid"
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
    form: 'InvoiceNewForm' // Arvon pitää olla uniikki
})(
    connect(mapStateToProps, { postInvoices })(withRouter(AddInvoice))
);