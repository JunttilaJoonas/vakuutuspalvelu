import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';

class IndexPage extends Component {

    render() {
        return (
            <div>
            <Grid fluid className="splash"> 
               <Row className="show-grid text-center information">
                <Col xs={12} sm={12}>
                <h3>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of 
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                    software like Aldus PageMaker including versions of Lorem Ipsum.
                </h3>
                <a href="/laskevakuutus"><Button bsClass="insurance_button">Laske hinta vakuutukselle</Button></a>
                 </Col>
               </Row>
            </Grid>
            <Grid fluid className="info_cards">
                <Row className="show-grid cards text-center">
               <Col xs={12} sm={4}>
               <Image className="info_image" src="cycling.jpg" responsive />
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of 
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                    software like Aldus PageMaker including versions of Lorem Ipsum.</p>
               </Col>
               <Col xs={12} sm={4}>
               <Image className="info_image" src="cycling.jpg" responsive />
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of 
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                    software like Aldus PageMaker including versions of Lorem Ipsum.</p>
               </Col>
               <Col xs={12} sm={4}>
               <Image className="info_image" src="cycling.jpg" responsive />
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of 
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                    software like Aldus PageMaker including versions of Lorem Ipsum.</p>
               </Col>   
               </Row>
            </Grid>
            </div>
        );
    }

}

export default IndexPage