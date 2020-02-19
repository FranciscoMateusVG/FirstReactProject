import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import Navigationitens from '../Navigationitens/Navigationitens';

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div>Menu</div>
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <Navigationitens />
      </nav>
    </header>
  );
};

export default Toolbar;
