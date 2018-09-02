import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ClientList from '../components/page_clientlist';

class IndexPage extends Component {

    

    render() {
        

        return (
            <div>
            <Grid fluid> 
               <Row className="show-grid">
                <Col xs={12} sm={2}></Col>
                
                <Col xs={12} sm={8}>
                
                {/* Render list of clients */}
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