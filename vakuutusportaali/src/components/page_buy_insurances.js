import React from "react";

export class InsuranceForm extends React.Component {

    constructor(props){
        super(props);

        let insurances = sessionStorage.getItem("chosenOnes");
        insurances = JSON.parse(insurances);

        this.state = {
            insurances : insurances
        }
    }

    render(){
        let insuranceNodes = this.state.insurances.map(insurance => {
           return(
               <div key={insurance.id}>
                   <h3>{insurance.category} - {insurance.name}</h3>
                   <p>Omavastuu: <input type="number"/></p>
                   <p>Vakuutussumma: <input type="number"/></p>
               </div>
           )
        });

        return (
            <div>
                <h1>Osta vakuutukset</h1>
                {insuranceNodes}
                <input type="submit"/>
            </div>

        )
    }
}