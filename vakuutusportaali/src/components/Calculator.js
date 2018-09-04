import React from "react";

export class Calculator extends React.Component {
    render() {
        const data = this.props.data;
        let totalPrice = 0;

        for (let i = 0; i < data.length; i++) {
            let insurance = data[i].props.about;
            totalPrice += insurance.price;
        }

        let nodes;
        if (totalPrice > 0) nodes =
            <div>
                <h3>Vakuutuksia {data.length} kpl. Hinta-arvio: {totalPrice} euroa / vuosi</h3>
            </div>;

        return (
            <div>
                {nodes}
            </div>
        )
    }
}

