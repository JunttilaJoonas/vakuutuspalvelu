import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Image, Button, Table } from 'react-bootstrap';
import ClientList from '../components/page_clientlist';

class IndexPage extends Component {

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