import React, { Component } from 'react'
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';
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
            this.context.history.push('/');
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
                <li key={ins._id}>
                    Vakuutuksen id: {ins._id} 
                    Vakuutustyyppi: {ins.insurancetype} 
                    Laskun eräpäivä: {ins.nextPaymentDate}  
                    Voimassa: {ins.valid} 
                    <Button value={ins._id} 
                            id={ins._id} 
                            className="btn btn-danger pull-xs-right"
                            onClick={this.onClickDeleteInsurance.bind(this)}>Poista vakuutus</Button>    
                </li>
            )
        }) : [];
    
    // Map and return list of insurance claims to user
    let userClaims = this.props.user.profileclaims;
    let userClaimsNodes = userClaims ? userClaims.map(claims => {
            return (
                <li key={claims._id}>
                    Syy: {claims.text} 
                    Tila: {claims.handled}
                </li>
            )
        }) : [];
    
    // Map and return list of messages from insurance handler to user
    let messageList = this.props.user.profilemessages;
    let messageNodes = messageList ? messageList.map(msg => {
            return (
                <li key={msg._id}>
                    Viesti: {msg.Message} 
                    Lähettäjä: {msg.Sender}
                </li>
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
        
                            <p>{user._id}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>

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
