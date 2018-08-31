import React from "react";
import axios from "axios/index";

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

    componentDidMount() {
        axios.get("http://localhost:4000/profiili/current")
            .then(res => {
                this.setState({profile: res.data});
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const {user} = this.props.auth;
        console.log(this.props.auth);
        this.setState({text: ''});
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
                        {insurance.name}
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
                <input type="submit"/>
            </div>

        )
    }
}