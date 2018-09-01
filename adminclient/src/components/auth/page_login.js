import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import LoginForm from './form_login';


export default class LoginAdmin extends Component {

  render() {
    return (
      <div>
                    <Grid fluid className="splash">
                    <Row className="show-grid information">
                    <Col xs={12} sm={2}/>
                    <Col xs={12} sm={8} className="userprofile">
                        < LoginForm />
                    </Col>
                    <Col xs={12} sm={2}/>
                    </Row>
                </Grid>
                </div>
    )
  }
}
