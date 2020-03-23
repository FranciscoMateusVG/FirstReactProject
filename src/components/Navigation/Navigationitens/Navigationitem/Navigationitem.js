import React from 'react';
import classes from './Navigationitem.module.css';
import { Link } from 'react-router-dom';

const Navigationitem = props => (
	<li className={classes.Navigationitem}>
		<Link to={props.link} className={props.active ? classes.active : null}>
			{props.children}
		</Link>
	</li>
);

export default Navigationitem;
