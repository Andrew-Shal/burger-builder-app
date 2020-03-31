import React from 'react';
import Auxiliary from '../../../hoc/Auxilary';
const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
                </li>
            )}
        );

    return (<Auxiliary>
        <h3>Your Order</h3>
        <p>A Delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
    </Auxiliary>)
};

export default orderSummary;