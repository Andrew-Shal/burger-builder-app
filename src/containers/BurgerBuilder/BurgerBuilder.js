import React, {useState} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const BurgerBuilder = props => {
    const [ingredients,setIngredients] = useState({
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    }); 

    const [purchasable,setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    const [totalPrice, setTotalPrice] = useState(4);

    const INGREDIENT_PRICES ={
        salad: 0.5,
        cheese:0.4,
        meat: 1.3,
        bacon: 0.7
    }

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const updatePurchaseState = (ingredients) => {
        const cpyIngredients = {...ingredients};
        const sum = Object.keys(cpyIngredients)
            .map(igKey => cpyIngredients[igKey])
            .reduce((sum,el) => sum + el,0);

        setPurchasable(sum > 0);
    }

    const addIngredientHandler = type => {
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice + priceAddition;
        setTotalPrice(newPrice);
        setIngredients(updatedIngredients);

        updatePurchaseState(updatedIngredients);
    }
    
    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type];

        if (oldCount <= 0) return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice - priceDeduction;
        setTotalPrice(newPrice);
        setIngredients(updatedIngredients);

        updatePurchaseState(updatedIngredients);
    };

    const purchaseCancelhandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        console.log("order continued!");
    };
    const disabledInfo = {...ingredients};

    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
    <Auxilary>
        <Modal show={purchasing} modalClosed={purchaseCancelhandler}>
            <OrderSummary totalPrice={totalPrice} purchaseContinued={purchaseContinueHandler} purchaseCancelled={purchaseCancelhandler} ingredients={ingredients}/>
        </Modal>
        <Burger ingredients={ingredients}/>
        <BuildControls ordered={purchaseHandler} purchasable={purchasable} price={totalPrice} disabled={disabledInfo} ingredientAdded={addIngredientHandler} ingredientRemoved={removeIngredientHandler}/>
    </Auxilary>
    )
};

export default BurgerBuilder;