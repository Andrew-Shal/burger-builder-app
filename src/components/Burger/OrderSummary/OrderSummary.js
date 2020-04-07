import React, {useEffect} from 'react';
import Auxiliary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';
import useIsMount from '../../../Utilities/UseIsMount';

const OrderSummary = props => {
    const isMount = useIsMount();
    useEffect(()=>{
        if(!isMount){
            console.log("[orderSummary] will update");
        }
    });

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
        <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
        <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>

    </Auxiliary>)
};

export default OrderSummary;