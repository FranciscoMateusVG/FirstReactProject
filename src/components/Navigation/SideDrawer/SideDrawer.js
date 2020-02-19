import React from 'react';
import Logo from '../../UI/Logo/Logo';
import Navigationitens from '../Navigationitens/Navigationitens';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hof/Auxiliar';

const SideDrawer = props => (
  <Aux>
    <Backdrop show />
    <div className={classes.SideDrawer}>
      <Logo height="11%" />
      <nav>
        <Navigationitens />
      </nav>
    </div>
  </Aux>
);

export default SideDrawer;
