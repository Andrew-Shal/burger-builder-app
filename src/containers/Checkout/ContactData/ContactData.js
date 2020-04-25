import React, {useState, isValidElement} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';

const ContactData = props => {
    const [loadingState, setLoadingState] = useState(false);

    const [formIsValid,setFormIsValid] = useState(false);

    const [orderForm,setOrderForm] = useState({
        name:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Name'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Street'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        zipCode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'ZIP Code'
            },
            value:'',
            validation:{
                required:true,
                minLength:5,
                maxLength:5
            },
            valid:false,
            touched:false
        },
        country:{            
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Country'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Your E-Mail'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}
                ]
            },
            value:'fastest',
            validation:{},
            valid:true
        }
    });

    const checkValidity = (value,rules) => {
        let isValid = true;
        if(!rules) return isValid;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    const orderHandler = (e)=>{
        e.preventDefault();

        setLoadingState(true);

        const formData = {};

        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            igdts:props.ings,
            price:+props.totalPrice,
            orderData:formData
        }
        axios.post('/orders.json',order)
        .then(res=>{
            setLoadingState(false);
            props.history.push('/');
        })
        .catch(err=>{
            setLoadingState(false);
        }); 
    }

    const inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifiers in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    const formElementsArray = [];
    for(let key in orderForm){
        formElementsArray.push({
            id:key,
            config:orderForm[key]
        });
    }
    let form = null;
    if(formElementsArray){
        form = (
            <form onSubmit={orderHandler}>
                {formElementsArray.map(formElement => (<Input key={formElement.id} touched={formElement.config.touched} invalid={!formElement.config.valid} shouldValidate={formElement.config.validation} changed={(e)=> inputChangedHandler(e,formElement.id)} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value}/>))}
                <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
    }

    if(loadingState){
        form = <Spinner/>;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings:state.ingredients,
        totalPrice:state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);