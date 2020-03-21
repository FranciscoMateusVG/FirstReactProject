import React from 'react';
import classes from './Navigationitens.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const Navigationitens = () => (
	<ul className={classes.Navigationitens}>
		<Navigationitem link='/' active>
			Home
		</Navigationitem>
		<Navigationitem link='/'> Modo Analista</Navigationitem>
	</ul>
);

export default Navigationitens;
