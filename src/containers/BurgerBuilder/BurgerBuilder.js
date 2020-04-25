import React, {useState, useEffect} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//import useIsMount from '../../Utilities/UseIsMount';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const BurgerBuilder = props => {
    //const isMount = useIsMount();

    //const [ingredients,setIngredients] = useState(null); 

    useEffect(() => {
/*         if(isMount){
            console.log("is mounting");
            axios.get('/ingredients.json')
            .then(res=>{
                console.log("got response");
                setIngredients(res.data);
            })
            .catch(err=> {
                console.log("catched an error!:"+err);
                setError(err);
            });
        } */
    });

    const [purchasing, setPurchasing] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [error,setError] = useState(null);

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const updatePurchaseState = (ingredients) => {
        const cpyIngredients = {...ingredients};
        const sum = Object.keys(cpyIngredients)
            .map(igKey => cpyIngredients[igKey])
            .reduce((sum,el) => sum + el,0);

        return sum > 0;
    }

    const purchaseCancelhandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.history.push('/checkout');
    };
    const disabledInfo = {...props.ings};

    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = error ? <p>Ingredients can't be loaded!</p> :<Spinner/>;

    if(props.ings){
        burger = (
            <Auxilary>
                <Burger ingredients={props.ings}/>
                <BuildControls ordered={purchaseHandler} purchasable={updatePurchaseState(props.ings)} price={props.totalPrice} disabled={disabledInfo} ingredientAdded={props.onIngredientAdded} ingredientRemoved={props.onIngredientRemoved}/>
            </Auxilary>
        )

        orderSummary = <OrderSummary totalPrice={props.totalPrice} purchaseContinued={purchaseContinueHandler} purchaseCancelled={purchaseCancelhandler} ingredients={props.ings}/>;
            console.log("here");
    }

    if(loadingState){
        orderSummary = <Spinner/>
    }

    return (
    <Auxilary>
        <Modal show={purchasing} modalClosed={purchaseCancelhandler}>
            {orderSummary}
        </Modal>
        {burger}
    </Auxilary>
    )
};
const mapStateToProps = state => {
    return {
        ings:state.ingredients,
        totalPrice:state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));