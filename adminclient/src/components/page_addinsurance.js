import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
/*import InsuranceForm from './form_addinsurance';*/
import InsuranceForm from './form.addinsuranceR';


export default class page_addinsurance extends Component {

  render() {
    return (
      <div>
            <Grid fluid className="splash"> 
                    <Row className="show-grid cards text-center">
                        < InsuranceForm />
                    </Row>
                </Grid>
      </div>
    )
  }
}
