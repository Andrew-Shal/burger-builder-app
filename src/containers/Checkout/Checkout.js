import React, {useState, useEffect, useRef} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import useIsMount from '../../Utilities/UseIsMount';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

const Checkout = props => {
    const isMount = useIsMount();
    const [totalPrice, setTotalPrice] = useState(0);
    const [ingredientsState,setIngredientsState] = useState(null);

    const willMount = useRef(true);
    if(willMount.current){

//    const hookComponent = ()=>{
        //if(isMount);
            const query = new URLSearchParams(props.location.search);
            let ingredients = {};
            let price = 0;
            for(let param of query.entries()){
                if(param[0] === 'price'){
                    price = param[1]
                }else{
                    ingredients[param[0]] = +param[1];
                }
            }
            setIngredientsState(ingredients);
            setTotalPrice(price);
            willMount.current = false;
        //}
    };

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('checkout/contact-data');
    }

    return (
        <div>
            <CheckoutSummary ingredients={ingredientsState} checkoutCancelled={checkoutCancelledHandler} checkoutContinued={checkoutContinuedHandler}/>
            <Route path={props.match.path + '/contact-data'} render={(props) => <ContactData ingredients={ingredientsState} price={totalPrice} {...props}/>}/>
        </div>
    );
}

export default Checkout;