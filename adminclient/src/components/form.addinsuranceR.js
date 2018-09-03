import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Grid, Panel, Button, Glyphicon, ListGroup, ListGroupItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { postInsurances } from '../actions/actions_insurances';
import axios from 'axios';

class AddInsurance extends Component {

    state = {
        applications: [],
        profile: []
    }

    componentDidMount() {
        axios.get("http://localhost:3000/application/all").then(res => {
            this.setState({applications: res.data})})
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

    renderDropDown(field) {
        const className = 'form-group';
        return (
            <div className={className}>
            <label>{field.label}</label>
            <select className="form-control" {...field.input} >
            <option>True</option>
            <option>False</option>
            </select>
            </div>
        );
    }

    onSubmit(values) {
        // When submitted redirect user to '/'
        this.props.postInsurances(values);
        this.props.history.push('/');
    }

    fetchApplication(id) {
        let applicationid = id;
        axios.get("http://localhost:3000/application/id/" + applicationid).then(res => {
            this.setState({profile: res.data})},
          
        ).then(res => {this.handleInitialize().bind(this)})
    }

    handleInitialize() {
        console.log("are we here?")
        console.log(this.state.profile)
        const initData = {
            "applicationid": this.state.profile._id,
            "userid": this.state.profile.userid,
            "insurancetype": this.state.profile.insurancetype
        };
        this.props.initialize(initData);
    }



    render() {
        const { handleSubmit } = this.props;

        let applicationlist = this.state.applications;
        let applicationNodes = applicationlist ? applicationlist.map(application => {
                return (
                    <ListGroup key ={application._id}>
                    <ListGroupItem onClick={() => {this.fetchApplication(application._id)}}><b>Hakemus: </b>{application._id}</ListGroupItem>
                    </ListGroup>
                )
            }) : [];
    
        return (
            <div>
            <p>{applicationNodes}</p>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Vakuutuksenottajan käyttäjätunnus"
                    placeholder={this.state.profile._id}
                    name="applicationid"
                    component={this.renderField} />
                <Field
                    label="Voimassa"
                    name="valid"
                    component={this.renderDropDown} />
                <Field
                    label="Käyttäjätunnus"
                    name="userid"
                    placeholder={this.state.profile.userid}
                    component={this.renderField}
                     />
                <Field
                    label="Vakuutuksen tyyppi"
                    placeholder={this.state.profile.insurancetype}
                    name="insurancetype"
                    component={this.renderField} />
                <button type="submit" className="btn btn-primary">Lisää</button>
                <Link to="/" className="btn btn-danger">Poistu</Link>
            </form>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    insurances: state.insurances,
    profile: state.profile
});

export default reduxForm({
    form: 'InsuranceNewForm' // Arvon pitää olla uniikki
})(
    connect(mapStateToProps, { postInsurances })(withRouter(AddInsurance))
);