import React, {useState, useEffect} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import useIsMount from '../../Utilities/UseIsMount';

const BurgerBuilder = props => {
    const isMount = useIsMount();

    const [ingredients,setIngredients] = useState(null); 

    useEffect(() => {
        if(isMount){
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
        }
    });

    const [purchasable,setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    const [totalPrice, setTotalPrice] = useState(4);

    const [loadingState, setLoadingState] = useState(false);

    const [error,setError] = useState(null);

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
        console.log(props);
        const queryParams = [];

        for(let i in ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
        }

        queryParams.push('price='+totalPrice);
        
        const queryString = queryParams.join('&');
        props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });
        // console.log("order continued!");
    };
    const disabledInfo = {...ingredients};

    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = error ? <p>Ingredients can't be loaded!</p> :<Spinner/>;

    if(ingredients){
        burger = (
            <Auxilary>
                <Burger ingredients={ingredients}/>
                <BuildControls ordered={purchaseHandler} purchasable={purchasable} price={totalPrice} disabled={disabledInfo} ingredientAdded={addIngredientHandler} ingredientRemoved={removeIngredientHandler}/>
            </Auxilary>
        )

        orderSummary = <OrderSummary totalPrice={totalPrice} purchaseContinued={purchaseContinueHandler} purchaseCancelled={purchaseCancelhandler} ingredients={ingredients}/>;
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

export default withErrorHandler(BurgerBuilder,axios);