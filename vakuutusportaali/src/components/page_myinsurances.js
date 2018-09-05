import React, {Component} from 'react';
import {Col, Grid, ListGroup, ListGroupItem, Panel, Row} from 'react-bootstrap';
import axios from 'axios';

class MyInsurance extends Component {

    state = {
        profile: {},
        profileclaims: [],
        applications: []
    };

    componentWillMount() {
        axios.get("http://localhost:4000/profiili/current")
            .then(res => {
                this.setState({profile: res.data});
                let id = this.state.profile._id;
                axios.get("http://localhost:4000/application/customer/" + id)
                    .then(res => {
                        this.setState({applications: res.data})
                    })
            })

    }

    render() {
        let insurances = this.state.profile.profilesinsurances;
        let insuranceNodes = insurances ? insurances.map(ins => {
            return (
                <ListGroup key={ins._id}>
                    <ListGroupItem><b>Vakuutustyyppi:</b> {ins.insurancetype} </ListGroupItem>
                    <ListGroupItem><b>Vakuutuksen tunniste:</b> {ins._id} </ListGroupItem>
                    <ListGroupItem><b>Lisätiedot: </b>{ins.additionalinfo} </ListGroupItem>
                    <ListGroupItem><b>Omavastuu:</b> {ins.deductible} euroa</ListGroupItem>
                </ListGroup>
            )
        }) : [];

        let applications = this.state.applications;
        let applicationNodes = applications ? applications.map(application => {
            return (
                <ListGroup key={application._id}>
                    <ListGroupItem><b>Vakuutustyyppi:</b> {application.insurancetype}</ListGroupItem>
                    <ListGroupItem><b>Hakemuksen tunniste:</b> {application._id}</ListGroupItem>
                    <ListGroupItem><b>Omavastuu:</b> {application.deductible} euroa</ListGroupItem>
                    <ListGroupItem><b>Lisätiedot: </b>{application.additionalinfo} </ListGroupItem>
                </ListGroup>
            )
        }) : [];

        let insuranceClaims = this.state.profile.profileclaims;
        let insuranceClaimNodes = insuranceClaims ? insuranceClaims.map(ins => {
            return (
                <ListGroup key={ins._id}>
                    <ListGroupItem><b>Vakuutustyyppi:</b> {ins.text}</ListGroupItem>
                    <ListGroupItem><b>Vakuutuksen tila: </b>{ins.handled}</ListGroupItem>
                    <ListGroupItem><b>Vakuutuksen tunniste: </b>{ins._id}</ListGroupItem>
                    <ListGroupItem><b>Hakemuspäivä: </b>{ins.date}</ListGroupItem>
                </ListGroup>
            )
        }) : [];

        let invoiceList = this.state.profile.profilesinvoices;
        let invoiceNodes = invoiceList ? invoiceList.map(invoice => {

            return (
                <ListGroup key={invoice._id}>
                    <ListGroupItem><b>Id: </b>{invoice._id}</ListGroupItem>
                    <ListGroupItem><b>Eräpäivä </b>{invoice.duedate}</ListGroupItem>
                    <ListGroupItem><b>Viitenumero: </b><i>{invoice.referenceNumber}</i></ListGroupItem>
                </ListGroup>
            )
        }) : [];

        let profileMessages = this.state.profile.profilemessages;
        let profileMessageNodes = profileMessages ? profileMessages.map(msg => {
            return (
                <ListGroup key={msg.messageId}>
                    <ListGroupItem><b>Viesti:</b> {msg.Message}</ListGroupItem>
                    <ListGroupItem><b>Lähettäjä: </b>{msg.Sender}</ListGroupItem>
                </ListGroup>
            )
        }) : [];

        return (
            <div>
                <Grid fluid className="splash">
                    <Row className="show-grid information">
                        <Col xs={12} sm={2}/>
                        <Col xs={12} sm={8} className="userprofile">

                            <Panel id="collapsible-panel-example-2" defaultExpanded>
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Asiakastiedot
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <ListGroup>
                                            <ListGroupItem><b>Nimi:</b> {this.state.profile.name}</ListGroupItem>
                                            <ListGroupItem><b>Sähköposti:</b> {this.state.profile.email}</ListGroupItem>
                                            <ListGroupItem><b>Puhelin:</b> {this.state.profile.phone}</ListGroupItem>
                                        </ListGroup>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Voimassaolevat vakuutukset ({insuranceNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {insuranceNodes}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Käsittelyssä olevat hakemukset ({applicationNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {applicationNodes}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Vahinkotapahtumat ({insuranceClaimNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {insuranceClaimNodes}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Laskut ({invoiceNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {invoiceNodes}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Viestit ({profileMessageNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {profileMessageNodes}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                        </Col>
                        <Col xs={12} sm={2}/>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default MyInsurance