import React from 'react';
import Logo from '../../UI/Logo/Logo';
import Navigationitens from '../Navigationitens/Navigationitens';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hof/Aux/Auxiliar';

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]

  if (props.open) {
    attachedClasses = [classes.SideDrawer,classes.Open]    
  }
  
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <Logo height="11%" />
        <nav>
          <Navigationitens />
        </nav>
      </div>
    </Aux>)
};

export default SideDrawer;
