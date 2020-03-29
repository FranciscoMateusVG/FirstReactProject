import React from 'react';
import Colunas from './Colunas/Colunas';
import Celulas from './Celulas/Celulas';
import classes from './Tabela.module.css';

import Aux from '../../../hof/Aux/Auxiliar';

const Tabela = props => {
	return (
		<Aux>
			<table className={classes.Tabela}>
				<Colunas colunas={props.colunas} />
				<Celulas data={props.data} clicked={props.clicked} icone={props.icone} />
			</table>
		</Aux>
	);
};

export default Tabela;
