import React, {useState} from 'react';
import Auxilary from '../Auxilary/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawer,setShowSideDrawer] = useState(true);

    const sideDrawerClosedhandler = () => {
        setShowSideDrawer(false);
    };
    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(prevState => !prevState.showSideDrawer);
    }


    return (<Auxilary>
        <Toolbar toggleDrawer = {sideDrawerToggleHandler}/>
        <SideDrawer open={showSideDrawer} closed={sideDrawerClosedhandler}/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxilary>);
};
export default Layout;