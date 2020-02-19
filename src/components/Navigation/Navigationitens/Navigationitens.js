import React from 'react';
import classes from './Navigationitens.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const Navigationitens = () => (
  <ul className={classes.Navigationitens}>
    <Navigationitem link="/" active>
      Testim
    </Navigationitem>
    <Navigationitem link="/"> Testao</Navigationitem>
  </ul>
);

export default Navigationitens;
