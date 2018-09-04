import React, {Component} from 'react'
import {Col, Grid, Row} from 'react-bootstrap';
import MessageForm from './forms/form_addmessage';

export default class page_addinsurance extends Component {

    /**
     * @desc This component renders page to add messages to customer.
     */

    render() {
        return (
            <div>
                <Grid fluid className="splash">
                    <Row className="show-grid information">
                        <Col xs={12} sm={2}/>
                        <Col xs={12} sm={8} className="userprofile">
                            < MessageForm/>
                        </Col>
                        <Col xs={12} sm={2}/>
                    </Row>
                </Grid>
            </div>
        )
    }
}
