import React from 'react';
import Classes from './Colunas.module.css';

const Colunas = props => {
	if (props.colunas.length > 0) {
		let colunas = props.colunas.map((value, index) => {
			return (
				<th className={Classes.Head} key={index}>
					{value.nome}
				</th>
			);
		});

		return (
			<thead>
				<tr>{colunas}</tr>
			</thead>
		);
	}

	return null;
};

export default Colunas;
