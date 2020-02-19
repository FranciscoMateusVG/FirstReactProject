import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hof/Auxiliar';
import BackDrop from '../Backdrop/Backdrop';

const Modal = props => (
  <Aux>
    <BackDrop show={props.show} click={props.click}></BackDrop>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'TranslateY(0)' : 'TranslateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default Modal;
