import React from 'react';
import Classes from './Celulas.module.css';
//import Aux from '../../../hof/Auxiliar';

const Celulas = props => {
	let celulas = null;

	if (props.data.length > 0) {
		// Gera o HTML
		celulas = props.data.map((value, index) => {
			let campos = value.map((valueArr, index) => {
				return (
					<td className={Classes.Cell} key={index}>
						{valueArr}
					</td>
				);
			});

			return <tr key={index}>{campos}</tr>;
		});
	}

	return <tbody>{celulas}</tbody>;
};

export default Celulas;
