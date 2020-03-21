import React, { Component } from 'react';
import Tabela from '../../components/UI/Tabela/Tabela';
import Aux from '../../hof/Aux/Auxiliar';

class ModoAnalista extends Component {
	state = {
		acoes: {},
		colunas: [
			'Nome da Ação',
			'Total de Ações',
			'Preço Médio',
			'Valor Patrimonial',
			'Preço De Mercado Hoje',
			'Valor Patrimonial de Mercador',
			'Valorização Patrimonal em R$',
			'Valorização Patrimonial em %'
		],
		novaAcao: false
	};

	async componentDidMount() {
		let acoes = await axios.get('http://localhost:8080/acoes');

		this.setState(prevState => (prevState.acoes = acoes.data.acoes));
	}

	novaAcaoHandler = () => {
		this.setState({ novaAcao: true });
	};

	cancelaNovaAcaoHandler = () => {
		this.setState({ novaAcao: false });
	};

	render() {
		return (
			<Aux>
				<Tabela colunas={this.state.colunas} data={this.state.acoes} />
			</Aux>
		);
	}
}

export default ModoAnalista;
