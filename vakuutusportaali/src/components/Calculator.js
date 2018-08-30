import React from "react";

export class Calculator extends React.Component {
    render(){
        const insurances = this.props.data;
        let totalPrice = 0;

        for (let i = 0; i < insurances.length; i++) {
            totalPrice += Number(insurances[i].props.about);
        }

        return (
            <h1>Arvioitu hinta: {totalPrice} euroa</h1>
        )
    }
}

