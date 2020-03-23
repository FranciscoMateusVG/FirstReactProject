import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hof/Aux/Auxiliar';
import BackDrop from '../Backdrop/Backdrop';

const Modal = props => (
	<Aux>
		<BackDrop show={props.show} clicked={props.clicked}></BackDrop>
		<div
			className={classes.Modal}
			style={{
				transform: props.show ? 'TranslateY(0)' : 'TranslateY(-100vh)',
				opacity: props.show ? '1' : '0'
			}}>
			<h3>{props.header}</h3>
			{props.children}
		</div>
	</Aux>
);

export default Modal;
