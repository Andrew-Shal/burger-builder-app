import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

const ContactData = props => {
    const [loadingState, setLoadingState] = useState(false);

    const orderHandler = (e)=>{
        e.preventDefault();
        console.log(props.ingredients);

        setLoadingState(true);

        const order = {
            igdts:props.ingredients,
            price:+props.price,
            customer:{
                name:'andrew shal',
                address:{
                    street:'test st.',
                    zipCode:'1234',
                    country:'Belize'
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
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

    const [contactInformation, setContactInformation] = useState(
        {
            name:'',
            email:'',
            address:{
                street:'',
                postalCode:''
            }
        }
    );

    let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
        </form>
    );

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

export default ContactData;