import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    let innerIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
                    .map((_,i) => <BurgerIngredient key={igKey + i} type={igKey}/>);
        })
        .reduce((arr,el) => arr.concat(el),[]);
 
        if(innerIngredients.length === 0){
            innerIngredients = <p>Please start adding ingredients</p>;
        }


    return (<div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {innerIngredients}
        <BurgerIngredient type="bread-bottom"/>
    </div>)
}
export default burger;