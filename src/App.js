import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxilary from './hoc/Auxilary';

const app = () => (
    <Auxilary>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </Auxilary>
)

export default app;
