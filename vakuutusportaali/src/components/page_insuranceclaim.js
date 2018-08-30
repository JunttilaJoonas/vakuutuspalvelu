import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import ClaimForm from './form_insuranceclaim';
import {addPost} from '../actions/postActions';

export default class page_insuranceclaim extends Component {

  
 
 
  render() {
    return (
      <div>
            <Grid fluid className="splash"> 
                    <Row className="show-grid cards text-center">
                        < ClaimForm />
                    </Row>
                </Grid>
      </div>
    )
  }
}
