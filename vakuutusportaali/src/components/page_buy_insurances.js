import React from "react";
import axios from "axios";

export class InsuranceForm extends React.Component {

    constructor(props) {
        super(props);

        let insurances = sessionStorage.getItem("chosenOnes");
        insurances = JSON.parse(insurances);

        let insurancesGrouped = {};
        let categories = [];

        insurances.forEach(insurance => {
            let category = insurance.category;
            if (!insurancesGrouped[category]) {
                insurancesGrouped[category] = [];
            }

            if (!categories[category]) {
                categories.push(category);
            }

            insurancesGrouped[category].push(insurance);

        });

        this.state = {
            insurancesGroupedByCategory: insurancesGrouped,
            profile: {}
        }
    }

    componentWillMount() {
        console.log("hello");
        
        axios.get("http://localhost:4000/profiili/current")
            .then(res => {
                this.setState({profile: res.data});
            })
    }

    onSubmit(e) {
        console.log("PROFILE:")
        console.log(this.state.profile);
        e.preventDefault();
        this.setState({text: ''});
    }

    //beginnings of a buy insurance function

    submitApplication(insurance, value) {
        console.log(insurance);
        const application = {
            userid: this.state.profile._id,
            insurancetype: insurance.name
        }
        console.log(application)
        axios.post('http://localhost:4000/application/create', application).then(
            res => {console.log(res)}
        )
        fetch('http://localhost:4000/application/create', {
        method: 'POST',
        body: application
        }).then(res => {console.log(res)})
      
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        let insurances = this.state.insurancesGroupedByCategory;
        let entries = Object.entries(insurances);
        let categoryNodes = entries.map(array => {
            let category = array[0];
            let insurances = array[1];
            let insuranceNodes = insurances.map(insurance => {
                return (
                    <li key={insurance.id}>
                        Vakuutuksen tyyppi: {insurance.name} <br/>
                        Haluttu omavastuu:
                        <select name="omavastuu" id="1234">
                            <option value="50">50</option>
                            <option>100</option>
                            <option>150</option>
                            <option>200</option>
                            <option>250</option>
                        </select>
                        <button onClick={() => {this.submitApplication(insurance)}}>Hae tätä vakuutusta</button> 
                    </li>
                   
                )
            });

            return (
                <div key={category}>
                    <h3>{category}</h3>
                    <ul>{insuranceNodes}</ul>
                </div>
            );

        });


        return (
            <div>
                <h1>Osta vakuutuksia</h1>
                {categoryNodes}
                <input type="submit" onClick ={this.onSubmit.bind(this)}/>
            </div>

        )
    }
}