import React from 'react';
import classes from './Layout.module.css';
import Aux from '../../hof/Auxiliar';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>{props.children}</main>
    <footer>Xerox To Xerox Xerox</footer>
  </Aux>
);

export default Layout;
