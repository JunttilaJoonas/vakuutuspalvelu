import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postUser } from '../../actions';

class AddUser extends Component {


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
        this.props.postUser(values);

    }



    render() {
        const { handleSubmit, pristine } = this.props;
       

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Sähköposti"
                    placeholder="Anna vakuutuksenottajan sähköposti"
                    name="email"
                    component={this.renderField} />
                <Field
                    label="Salasana"
                    placeholder="Aseta salasana käyttäjälle"
                    name="password"
                    component={this.renderField} />
                <button type="submit" className="btn btn-primary">Lisää</button>
                <Link to="/" className="btn btn-danger">Poistu</Link>
            </form>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.users,
    isPressed: false
});

export default reduxForm({
    form: 'NewUserNewForm' // Arvon pitää olla uniikki
})(
    connect(mapStateToProps, { postUser })(withRouter(AddUser))
);