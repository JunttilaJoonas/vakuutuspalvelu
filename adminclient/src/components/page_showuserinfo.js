import React, { Component } from 'react'
import { Row, Col, Grid, Panel, Button, Glyphicon, ListGroup, ListGroupItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { fetchUserProfile, deleteUserProfile, deleteUserInsurance } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ShowUserInfo extends Component {
  
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchUserProfile(id);
    }

    // Delete user profile
    onClickDelete() {
        const { id } = this.props.match.params;
        this.props.deleteUserProfile(id, () => {
            this.props.history.push('/');
        });
    }

    // Delete insurance from user
    onClickDeleteInsurance(e) {
        let iidee = e.target.id;
        console.log(iidee)
        this.props.deleteUserInsurance(iidee, () => {
            this.props.history.push('/');
        });
    }

  render() {
    
    const { user } = this.props;

    // If data is not loaded display this message
    if(!user) {
        return <div>Ladataan profiilia</div>
    }

    // Map and return list of insurances to user
    let insuranceList = this.props.user.profilesinsurances;
    let insuranceClaimNodes = insuranceList ? insuranceList.map(ins => {
            return (
                <ListGroup key={ins._id}>
                <ListGroupItem><b>Id: </b>{ins._id}<Glyphicon 
                value={ins._id} 
                id={ins._id} 
                onClick={this.onClickDeleteInsurance.bind(this)} glyph="remove" className="pull-right" /></ListGroupItem>
                <ListGroupItem><b>Tyyppi: </b>{ins.insurancetype}</ListGroupItem>
                <ListGroupItem><b>Voimassa: </b>{ins.valid}</ListGroupItem>
                </ListGroup>
            )
        }) : [];
    
    // Map and return list of insurance claims to user
    let userClaims = this.props.user.profileclaims;
    let userClaimsNodes = userClaims ? userClaims.map(claims => {
            return (
                 <ListGroup key={claims._id}>
                 <ListGroupItem><b>Id: </b>{claims._id}</ListGroupItem>
                 <ListGroupItem><b>Syy: </b>{claims.text}</ListGroupItem>
                 <ListGroupItem><b>Tila: </b>{claims.handled}</ListGroupItem>
                 <ListGroupItem><DropdownButton
                            title={"Tila"}
                            key={"claims"}
                            className="insurance_selector"
                            id="claims"
                        >
                            <MenuItem eventKey="Handled">Käsitelty</MenuItem>
                            <MenuItem eventKey="Pending">Käsittelyssä</MenuItem>
                </DropdownButton></ListGroupItem>
                 </ListGroup>
            )
        }) : [];
    
    // Map and return list of messages from insurance handler to user
    let messageList = this.props.user.profilemessages;
    let messageNodes = messageList ? messageList.map(msg => {
            console.log(msg);
            return (
                <ListGroup key={msg.id}>
                <ListGroupItem><b>Id: </b>{msg.id}</ListGroupItem>
                <ListGroupItem><b>Viesti: </b>{msg.Message}</ListGroupItem>
                <ListGroupItem><b>Lähettäjä: </b><i>{msg.Sender}</i></ListGroupItem>
                </ListGroup>
            )
        }): [];

    return (
      
        <div>
        <Grid fluid className="splash">
            <Row className="show-grid information">
                <Col xs={12} sm={2}/>
                <Col xs={12} sm={8} className="userprofile">
                    
                    <Link to="/">Takaisin tuloksiin</Link>
                    <Button className="btn btn-danger pull-right" bsSize="small"
                    onClick={this.onClickDelete.bind(this)}>Poista asiakas</Button>
                    <Panel id="collapsible-panel-example-2" defaultExpanded>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                Asiakastiedot
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
        
                            <p><b>Käyttäjä id: </b>{user._id}</p>
                            <p><b>Nimi: </b>{user.name}</p>
                            <p><b>Sähköposti: </b>{user.email}</p>
                            <p><b>Puh: </b>{user.phone}</p>

                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>

                    <Panel id="collapsible-panel-example-2">
                        <Panel.Heading>
                            <Panel.Title toggle>
                                Vakuutukset
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
                                Vahinkotapahumat
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>

                               {userClaimsNodes}

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

                                {messageNodes}

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

function mapStateToProps({ users }, ownProps) {
    return {user: users[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchUserProfile, deleteUserProfile, deleteUserInsurance })(ShowUserInfo);
