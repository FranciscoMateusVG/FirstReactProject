import React from 'react';
import logoImage from '../../../assets/images/indexlogo.png';
import classes from './Logo.module.css';

const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={logoImage} alt="BlackCat"></img>
  </div>
);

export default Logo;
