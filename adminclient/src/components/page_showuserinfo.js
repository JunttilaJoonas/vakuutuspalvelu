import React, { Component } from 'react'
import { Table, Row, Col, Grid, Panel, Image, Button } from 'react-bootstrap';
import { fetchUserProfile } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ShowUserInfo extends Component {

    componentDidMount() {
        const { _id } = this.props.match.params;
        this.props.fetchUserProfile(_id);
    }

  render() {
    
    const { user } = this.props;

    if(!user) {
        return <div>Ladataan profiilia</div>
    }

    const insurances =  user.profilesinsurances.map(insurances => {
        return (
            <div key={insurances._id}>
            <li>{insurances.insurancetype} Voimassa: {insurances.valid} Seuraava eräpäivä: {insurances.nextPaymentDate}</li>
            </div>
        )
    })

    return (
      
        <div>
        <Grid fluid className="splash">
            <Row className="show-grid information">
                <Col xs={12} sm={2}/>
                <Col xs={12} sm={8} className="userprofile">
                    
                    <Link to="/">Takaisin tuloksiin</Link>
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
                                
                                <p>{insurances}</p>
                                
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
                                Tänne vahinkotapahtumat
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
                                Tänne tulee viestit
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

export default connect(mapStateToProps, { fetchUserProfile })(ShowUserInfo);
