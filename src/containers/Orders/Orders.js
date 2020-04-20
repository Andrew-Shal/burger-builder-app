import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import useIsMount from '../../Utilities/UseIsMount';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const Orders = props => {
    const isMount = useIsMount();
    const [orders,setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(isMount){
            axios.get('/orders.json')
                .then(res => {
                    setLoading(false);
                    let fetchedOrders = [];
                    for(let key in res.data){
                        fetchedOrders.push({...res.data[key], id: key});
                    }
                    setOrders(fetchedOrders);
                })
                .catch(err => {
                    setLoading(false);
                });
        }
    });

    let ordersTemplate = null;
    if(orders){
        ordersTemplate = orders.map(order => <Order key= {order.id} ingredients={order.igdts} price={order.price}/>);
    }
    return (
        <div>
            {ordersTemplate}
        </div>
    );
}

export default withErrorHandler(Orders, axios);