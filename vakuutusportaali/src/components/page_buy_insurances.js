import React from "react";

export class InsuranceForm extends React.Component {

    constructor(props){
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
            insurancesGroupedByCategory : insurancesGrouped,
            categories : categories,
            insurances : insurances
        }
    }

    render(){

        let object = this.state.insurancesGroupedByCategory;
        let entries = Object.entries(object);
        console.log("entries:", entries);
        let nodes = entries.map(array => {
            let category = array[0];
            let insurances = array[1];
            let insuranceNodes = insurances.map(insurance => {
                return (
                    <div key={insurance.id}>
                        {insurance.name}
                    </div>
                )
            });

            return(
                <div key={category}>
                    <h3>{category}</h3>
                    {insuranceNodes}
                </div>
            );

        });


        return (
            <div>
                <h1>Osta vakuutuksia</h1>
                {nodes}
                <input type="submit"/>
            </div>

        )
    }
}