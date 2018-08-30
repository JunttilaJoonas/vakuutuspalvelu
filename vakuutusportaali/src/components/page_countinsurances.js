import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import DragandDrop from './DragandDrop';

class CountInsurance extends Component {
    render() {
        return(
            <div>
                <Grid fluid className="splash">
                    <Row className="show-grid text-center information">
                        <Col xs={12} sm={12}>
                          < DragandDrop /> 
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default CountInsurance