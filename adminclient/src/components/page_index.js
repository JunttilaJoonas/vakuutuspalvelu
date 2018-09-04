import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ClientList from '../components/page_clientlist';

class IndexPage extends Component {

    /**
    * @desc This component renders index page to display list of clients
    */

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={12} sm={2}></Col>
                        <Col xs={12} sm={8}>

                            <ClientList />

                        </Col>
                        <Col xs={12} sm={2}></Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default IndexPage