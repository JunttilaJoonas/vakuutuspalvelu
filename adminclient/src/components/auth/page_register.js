import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import RegisterForm from './form_register';


export default class RegisterAdmin extends Component {

  render() {
    return (
      <div>
                    <Grid fluid className="splash">
                    <Row className="show-grid information">
                    <Col xs={12} sm={2}/>
                    <Col xs={12} sm={8} className="userprofile">
                        < RegisterForm />
                    </Col>
                    <Col xs={12} sm={2}/>
                    </Row>
                </Grid>
                </div>
    )
  }
}
