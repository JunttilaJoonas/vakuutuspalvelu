import React, {Component} from 'react';
import {Grid, Row, Col, Image, Button} from 'react-bootstrap';
import axios from 'axios';
import {Calculator} from "./Calculator";

class DragandDrop extends Component {

    state = {
        price: 0,
        insurances: []
    };

    componentDidMount() {
        axios.get('http://localhost:4000/insurancetypes')
            .then(res => {
                let insurances = res.data;

                for (let i = 0; i < insurances.length; i++) {
                    let insurance = insurances[i];
                    insurance.category = insurances[i].insurancetype;
                    if (insurance.price) {
                        console.log("Vakuutuksen hinta: ", insurance.price)
                    }
                    else {
                        insurance.price = 50;
                    }
                }

                this.setState({insurances: insurances});
            });
    }

    onDragOver = (e) => {
        e.preventDefault();
    };

    onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
    };

    onDrop = (event, category) => {
        let id = event.dataTransfer.getData("id");
        let filtered = this.state.insurances.filter(task => {
            if (task.name === id) {
                task.category = category;
            }
            return task;
        });

        this.setState({
            ...this.state,
            insurances: filtered,
        });
    };

    render() {
        let insObject = {chosenInsurances: []};
        let categories = [];

        this.state.insurances.forEach(insurance => {
            let field = insurance.category;

            if (!(field in insObject)) {
                insObject[field] = [];
                categories.push(field);
            }

            insObject[field].push(
                <div key={insurance._id}
                     onDragStart={(e) => this.onDragStart(e, insurance.name)}
                     draggable
                     className="draggable" style={{backgroundColor: "yellow"}}
                     about={insurance.price}>
                    {insurance.name}
                </div>
            );
        });

        let categoriesToPage = categories.map(category => {
            return (
                <Col xs={12} sm={4} key={category}>
                    <div className="insurance_category" onDragOver={(e) => this.onDragOver(e)} onDrop={e => {
                        this.onDrop(e, category)
                    }}>
                        <h3>{category}</h3>
                        {insObject[category]}
                    </div>
                </Col>
            )
        });

        //TODO: Korjaa post-pyyntö. Nyt se ei lähde mihinkään.
        //Seuraava funktio katsoo, mitkä ovat chosenInsurances ja sen jälkeen lähettää tiedot palvelimelle.
        //Palvelinkutsu ei vielä toimi, mutta se nyt on vain viilauskysymys (lähettää nyt muutenkin ihan dummy-apiin tietoa)
        const sendChosenInsurancestoTheServer = (req) => {
            let insurancesToBeCalculated = [];
            for (let i = 0; i < insObject.chosenInsurances.length; i++) {
                insurancesToBeCalculated.push(insObject.chosenInsurances[i].key)
            }
            console.log("ins", insurancesToBeCalculated);
            let data = JSON.stringify(insurancesToBeCalculated);
            console.log(data);
            axios.post('http://localhost:4000/calculator', {
                body: data
            }).then((res) => {
                console.log(res)
            });
        };

        return (
            <div>
                <h1 className="header">Vakuutukset</h1>
                <Calculator data={insObject.chosenInsurances}/>
                <Grid fluid className="info_cards">
                    <Row className="show-grid cards text-center">
                        <div className="droppable" onDragOver={(e) => this.onDragOver(e)}
                             onDrop={(e) => this.onDrop(e, "chosenInsurances")}>
                            <h4>Pudota vakuutukset tähän</h4>
                            {insObject.chosenInsurances}
                            <Button bsClass="insurance_button" onClick={sendChosenInsurancestoTheServer.bind(this)}>Lähetä</Button>
                        </div>
                        {categoriesToPage}
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default DragandDrop;