import React from 'react';
import Classes from './Celulas.module.css';

const Celulas = props => {
	let celulas = null;

	if (props.data.length > 0) {
		// Gera o HTML
		celulas = props.data.map((value, index) => {
			let campos = value.map((valueArr, index) => {
				return (
					<td className={Classes.Cell} data={value[0]} key={index}>
						{valueArr}
					</td>
				);
			});

			return (
				<tr key={index} onClick={props.clicked}>
					{campos}
				</tr>
			);
		});
	}

	return <tbody>{celulas}</tbody>;
};

export default Celulas;
