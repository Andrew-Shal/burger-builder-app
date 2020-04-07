import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxilary from './hoc/Auxilary/Auxilary';

const app = () => (
    <Auxilary>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </Auxilary>
)

export default app;
