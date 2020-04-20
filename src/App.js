import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxilary from './hoc/Auxilary/Auxilary';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import { Route, Switch } from 'react-router-dom';

const app = () => (
    <Auxilary>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </Auxilary>
)

export default app;
