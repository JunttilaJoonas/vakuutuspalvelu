import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import axios from 'axios';

class MyInsurance extends Component {

    state = {
        profile: {},
        profileclaims: []
    };
    
    componentWillMount() {
        axios.get("http://localhost:4000/profiili/current")
            .then(res => {
                this.setState({profile: res.data});
            })        
    }

 

    render() {
        console.log(this.state.profile);
        let insurances = this.state.profile.profilesinsurances;
        let insuranceNodes = insurances ? insurances.map(ins => {
            return (
                <li key={ins._id}>
                    <p> Vakuutustyyppi: {ins.insurancetype} <br/>
                        Seuraava maksupäivä: {ins.nextPaymentDate} <br/>
                        Vakuutuksen tunniste: {ins._id}
                    </p>
                </li>
            )
        }) : [];

        let insuranceClaims = this.state.profile.profileclaims;
        let insuranceClaimNodes = insuranceClaims ? insuranceClaims.map(ins => {
            return (
                <li key={ins._id}>
                    <p> Vakuutustyyppi: {ins.text} <br/>
                        Vakuutuksen tila: {ins.handled} <br/>
                        Vakuutuksen tunniste: {ins._id} <br/>
                        Hakemuspäivä: {ins.date} <br/>
                    </p>
                </li>
            )
        }) : [];

        let profileMessages = this.state.profile.profilemessages;
        console.log(profileMessages);
        let profileMessageNodes = profileMessages ? profileMessages.map(msg => {
            return (
                <li key={msg.messageId}>
                    <p> Viesti: {msg.Message} <br/>
                        Lähettäjä: {msg.Sender} <br/>
                    </p>
                </li>
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
                                        <p>{this.state.profile.email}</p>
                                        <p>{this.state.profile.name}</p>
                                        <p>{this.state.profile.phone}</p>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        <p>Vakuutukset</p>
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <ol>
                                            {insuranceNodes}
                                        </ol>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Vahinkotapahumat
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                       <ol>
                                {insuranceClaimNodes}
                                       </ol>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Laskut
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        Tänne tulee laskut
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Viestit
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