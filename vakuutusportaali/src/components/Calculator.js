import React from "react";

export class Calculator extends React.Component {
    render(){
        const data = this.props.data;
        let totalPrice = 0;

        for (let i = 0; i < data.length; i++) {
            let insurance = data[i].props.about;
            totalPrice += insurance.price;
        }

        return (
            <h1>Arvioitu hinta: {totalPrice} euroa</h1>
        )
    }
}

