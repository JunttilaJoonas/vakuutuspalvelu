import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
/*import InsuranceForm from './form_addinsurance';*/
import ProfileForm from './forms/form_addprofile';
import UserForm from './forms/form_adduser';


export default class page_addprofile extends Component {

  /**
  * @desc This component renders page to add user profile.
  */

  render() {
    return (
      <div>
        <Grid fluid className="splash">
          <Row className="show-grid information">

            <Col xs={12} sm={2} />
            <Col xs={12} sm={8} className="userprofile">
              <UserForm />
              < ProfileForm />
            </Col>
            <Col xs={12} sm={2} />
          </Row>
        </Grid>
      </div>
    )
  }
}
