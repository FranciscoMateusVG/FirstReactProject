import React, { Component } from 'react';
import Tabela from '../../components/UI/Tabela/Tabela';
import Aux from '../../hof/Aux/Auxiliar';
import axios from 'axios';

class ModoAnalista extends Component {
	state = {
		acoes: [],
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
		let data = this.geraDadosTabela(acoes.data.acoes);

		this.setState(prevState => (prevState.acoes = data));
	}

	novaAcaoHandler = () => {
		this.setState({ novaAcao: true });
	};

	cancelaNovaAcaoHandler = () => {
		this.setState({ novaAcao: false });
	};

	geraDadosTabela = data => {
		//Empura os valores do Objeto em Array
		let arr = data.map(value => {
			let formatter = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			});

			let valorPatrimonial = formatter.format(
				value.Investido.qntTotal * value.Investido.precoMedio
			);
			let precoDeMercadoHoje = 8.5;

			let valorPatrimonialDeMercado = formatter.format(
				value.Investido.qntTotal * precoDeMercadoHoje
			);
			let valorizacaoPatrimonialRS = valorPatrimonialDeMercado - valorPatrimonial;
			let valorizacaoPatrimonialPer = valorizacaoPatrimonialRS / valorPatrimonial;

			return [
				value.Nome,
				value.Investido.qntTotal,
				formatter.format(value.Investido.precoMedio),
				valorPatrimonial,
				formatter.format(precoDeMercadoHoje),
				valorPatrimonialDeMercado,
				valorizacaoPatrimonialRS ? valorizacaoPatrimonialRS : null,
				valorizacaoPatrimonialPer ? valorizacaoPatrimonialPer : null
			];
		});

		return arr;
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
