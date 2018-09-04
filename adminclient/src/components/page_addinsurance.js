import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import InsuranceForm from './forms/form.addinsuranceR';

export default class page_addinsurance extends Component {

  /**
  * @desc This component renders page to add insurances to customer.
  */

  render() {
    return (
      <div>
        <Grid fluid className="splash">
          <Row className="show-grid information">
            <Col xs={12} sm={2} />
            <Col xs={12} sm={8} className="userprofile">
              < InsuranceForm />
            </Col>
            <Col xs={12} sm={2} />
          </Row>
        </Grid>
      </div>
    )
  }
}
