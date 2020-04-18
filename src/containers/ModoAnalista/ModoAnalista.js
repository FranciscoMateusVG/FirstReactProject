import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabela from '../../components/UI/Tabela/Tabela';
import Aux from '../../hof/Aux/Auxiliar';
import axios from 'axios';
import * as actionTypes from '../../store/actions';
import { geraDadosTabelaModoAnalista } from '../../functions/geraTabelas';
import Celula from '../../components/ObjectsConstructors/Cell';

class ModoAnalista extends Component {
	state = {
		colunas: [
			'Nome da Ação',
			'Total de Ações',
			'Preço Médio',
			'Valor Patrimonial',
			'Preço De Mercado Hoje',
			'Valor Patrimonial de Mercado',
			'Valorização Patrimonial em R$',
			'Valorização Patrimonial em %',
		],
	};

	atualizaOnBlur = (posicao, valor) => {
		const formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		});
		let tabelaAntiga = this.props.tabelaModoAnalista;

		let qtd = tabelaAntiga[1][posicao].valor;
		let valorPatrimonial = parseFloat(
			tabelaAntiga[3][posicao].valor
				.replace('R$', '')
				.replace('.', '')
				.replace(',', '.')
		);

		let valorPatrimonialDeMercado = qtd * parseFloat(valor);

		let valorizacaoPatrimonialRS =
			parseFloat(valorPatrimonialDeMercado) - valorPatrimonial;

		let valorizacaoPatrimonialPer = valorizacaoPatrimonialRS / valorPatrimonial;

		let color = 'red';
		if (valorizacaoPatrimonialRS > 0) {
			color = 'blue';
		}

		let posicoes = Object.keys(tabelaAntiga[0]).length - 3;

		let totalValorPatrimonialDeMercado = 0;
		let totalValorPatrimonial;
		let totalValorizacaoPatrimonialRS;
		let totalValorizacaoPatrimonialPer = 0;

		let tabelaAtualizada = tabelaAntiga.map((coluna) => {
			if (coluna.nome === 'Preço De Mercado Hoje') {
				coluna[posicao] = new Celula(valor, null);
			}

			if (coluna.nome === 'Valor Patrimonial') {
				totalValorPatrimonial = parseFloat(
					coluna[posicoes + 1].valor
						.replace('R$', '')
						.replace('.', '')
						.replace(',', '.')
				);
			}

			if (coluna.nome === 'Valor Patrimonial de Mercado') {
				coluna[posicao] = new Celula(
					formatter.format(valorPatrimonialDeMercado),
					null
				);
				for (let posicao = 1; posicao <= posicoes; posicao++) {
					const valor = parseFloat(
						coluna[posicao].valor.replace('R$', '').replace('.', '').replace(',', '.')
					);

					totalValorPatrimonialDeMercado += valor;
				}
				coluna[posicoes + 1] = new Celula(
					formatter.format(totalValorPatrimonialDeMercado),
					{
						backgroundColor: 'black',
						color: 'white',
					}
				);
			}

			if (coluna.nome === 'Valorização Patrimonial em R$') {
				coluna[posicao] = new Celula(formatter.format(valorizacaoPatrimonialRS), {
					color: color,
				});

				totalValorizacaoPatrimonialRS =
					totalValorPatrimonialDeMercado - totalValorPatrimonial;
				coluna[posicoes + 1] = new Celula(
					formatter.format(totalValorPatrimonialDeMercado - totalValorPatrimonial),
					{
						backgroundColor: 'black',
						color: 'white',
					}
				);
			}

			if (coluna.nome === 'Valorização Patrimonial em %') {
				coluna[posicao] = new Celula(
					`${(valorizacaoPatrimonialPer * 100).toFixed(2)}  %`,
					{
						color: color,
					}
				);
				totalValorizacaoPatrimonialPer =
					(totalValorizacaoPatrimonialRS / totalValorPatrimonial) * 100;

				coluna[posicoes + 1] = new Celula(
					`${totalValorizacaoPatrimonialPer.toFixed(2)} %`,
					{
						backgroundColor: 'black',
						color: 'white',
					}
				);
			}

			return coluna;
		});

		this.props.onTabelaAdded(tabelaAtualizada);
	};
	async componentDidMount() {
		//let acoes = this.props.dados;
		let acoes;
		acoes = await axios.get('http://localhost:8080/acoes');
		acoes = acoes.data.acoes;

		let novaTabela = geraDadosTabelaModoAnalista(
			acoes,
			0,
			this.state.colunas,
			this.atualizaOnBlur
		);
		this.props.onTabelaAdded(novaTabela);
	}

	render() {
		return (
			<Aux>
				<Tabela
					colunas={this.props.tabelaModoAnalista}
					data={this.props.tabelaModoAnalista}
				/>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dados: state.dados,
		tabelaModoAnalista: state.tabelaModoAnalista,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTabelaAdded: (tabela) => {
			dispatch({ type: actionTypes.ADD_TABELA_MODOANALISTA, tabela: tabela });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModoAnalista);
