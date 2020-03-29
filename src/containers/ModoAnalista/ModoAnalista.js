import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabela from '../../components/UI/Tabela/Tabela';
import Aux from '../../hof/Aux/Auxiliar';
import axios from 'axios';
import Coluna from '../../components/ObjectsConstructors/Coluna';
import Celula from '../../components/ObjectsConstructors/Cell';
import * as actionTypes from '../../store/actions';
import Cell from '../../components/ObjectsConstructors/Cell';

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
			'Valorização Patrimonial em %'
		]
	};

	async componentDidMount() {
		let acoes = this.props.dados;
		if (!acoes[0]) {
			acoes = await axios.get('http://localhost:8080/acoes');
			acoes = acoes.data.acoes;
		}

		this.geraDadosTabela(acoes, 0);
	}

	handleBlur = async event => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});
		let posicao = event.target.getAttribute('data-posicao');

		let valor = parseFloat(event.target.value.replace(',', '.'));

		posicao = posicao.split('/')[1];

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

		let tabelaAtualizada = this.props.tabelaModoAnalista.map(coluna => {
			if (coluna.nome === 'Preço De Mercado Hoje') {
				coluna[posicao] = new Cell(valor, null);
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
				coluna[posicao] = new Cell(
					formatter.format(valorPatrimonialDeMercado),
					null
				);
				for (let posicao = 1; posicao <= posicoes; posicao++) {
					const valor = parseFloat(
						coluna[posicao].valor
							.replace('R$', '')
							.replace('.', '')
							.replace(',', '.')
					);

					totalValorPatrimonialDeMercado += valor;
				}
				coluna[posicoes + 1] = new Cell(
					formatter.format(totalValorPatrimonialDeMercado),
					{
						backgroundColor: 'black',
						color: 'white'
					}
				);
			}

			if (coluna.nome === 'Valorização Patrimonial em R$') {
				coluna[posicao] = new Cell(formatter.format(valorizacaoPatrimonialRS), {
					color: color
				});

				totalValorizacaoPatrimonialRS =
					totalValorPatrimonialDeMercado - totalValorPatrimonial;
				coluna[posicoes + 1] = new Cell(
					formatter.format(totalValorPatrimonialDeMercado - totalValorPatrimonial),
					{
						backgroundColor: 'black',
						color: 'white'
					}
				);
			}

			if (coluna.nome === 'Valorização Patrimonial em %') {
				coluna[posicao] = new Cell(
					`${(valorizacaoPatrimonialPer * 100).toFixed(2)}  %`,
					{
						color: color
					}
				);
				totalValorizacaoPatrimonialPer =
					(totalValorizacaoPatrimonialRS / totalValorPatrimonial) * 100;
				console.log(totalValorizacaoPatrimonialPer);
				coluna[posicoes + 1] = new Cell(
					`${totalValorizacaoPatrimonialPer.toFixed(2)} %`,
					{
						backgroundColor: 'black',
						color: 'white'
					}
				);
			}

			return coluna;
		});

		this.props.onTabelaAdded(tabelaAtualizada);
	};

	geraDadosTabela = (data, precoDeMercadoHoje) => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});
		let totalDeAcoes = 0;
		let totalValorPatrimonial = 0;
		let totalValorPatrimonialDeMercado = 0;
		let totalValorizacaoPatrimonialRS = 0;
		let totalValorizacaoPatrimonialPer = 0;
		/////////////////////////////////////////
		/*Pega as colunas*/
		let arr2 = [];
		this.state.colunas.forEach(element => {
			if (element === 'Preço De Mercado Hoje') {
				arr2.push(new Coluna(element, { tipo: 'Input', funcao: this.handleBlur }));
			} else {
				arr2.push(new Coluna(element, { tipo: 'Normal' }));
			}
		});

		////////////////////////////////////////

		//Empura os valores do Objeto em Array
		//BODY
		data.forEach((value, index) => {
			let valorPatrimonial = value.Investido.qntTotal * value.Investido.precoMedio;
			totalDeAcoes += value.Investido.qntTotal;
			totalValorPatrimonial += valorPatrimonial;
			let valorPatrimonialDeMercado =
				value.Investido.qntTotal * precoDeMercadoHoje;

			totalValorPatrimonialDeMercado += valorPatrimonialDeMercado;

			let valorizacaoPatrimonialRS =
				parseFloat(valorPatrimonialDeMercado) - parseFloat(valorPatrimonial);
			let valorizacaoPatrimonialPer = valorizacaoPatrimonialRS / valorPatrimonial;
			totalValorizacaoPatrimonialPer += valorizacaoPatrimonialPer;
			totalValorizacaoPatrimonialRS += valorizacaoPatrimonialRS;
			let color = 'red';
			if (valorizacaoPatrimonialRS > 0) {
				color = 'blue';
			}

			let key = index + 1;
			arr2[0][key] = new Celula(value.Nome, null);
			arr2[1][key] = new Celula(value.Investido.qntTotal, null);
			arr2[2][key] = new Celula(
				formatter.format(value.Investido.precoMedio),
				null
			);
			arr2[3][key] = new Celula(formatter.format(valorPatrimonial), null);
			arr2[4][key] = new Celula(formatter.format(precoDeMercadoHoje), null);
			arr2[5][key] = new Celula(formatter.format(valorPatrimonialDeMercado), null);
			arr2[6][key] = new Celula(formatter.format(valorizacaoPatrimonialRS), {
				color: color
			});
			arr2[7][key] = new Celula(`${valorizacaoPatrimonialPer.toFixed(2)}  %`, {
				color: color
			});
		});

		//O FOOTER FICA AQUI MATEUS NÃO SE ESQUEÇA
		let key = Object.keys(arr2[0]).length - 1;

		arr2[0][key] = new Celula('TOTAL', {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[1][key] = new Celula(totalDeAcoes, {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[2][key] = new Celula('', { backgroundColor: 'black' });
		arr2[3][key] = new Celula(formatter.format(totalValorPatrimonial), {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[4][key] = new Celula('', { backgroundColor: 'black' });
		arr2[5][key] = new Celula(formatter.format(totalValorPatrimonialDeMercado), {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[6][key] = new Celula(formatter.format(totalValorizacaoPatrimonialRS), {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[7][key] = new Celula(`${totalValorizacaoPatrimonialPer.toFixed(2)} %`, {
			backgroundColor: 'black',
			color: 'white'
		});

		this.props.onTabelaAdded(arr2);
	};

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

const mapStateToProps = state => {
	return {
		dados: state.dados,
		tabelaModoAnalista: state.tabelaModoAnalista
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTabelaAdded: tabela => {
			dispatch({ type: actionTypes.ADD_TABELA_MODOANALISTA, tabela: tabela });
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModoAnalista);
