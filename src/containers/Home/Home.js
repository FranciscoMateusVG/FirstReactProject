import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabela from '../../components/UI/Tabela/Tabela';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';
import Aux from '../../hof/Aux/Auxiliar';
import classes from './Home.module.css';
import NovaAcao from '../../containers/ModalNovaAcao/NovaAcao';
import AnaliseAcao from '../../containers/ModalAnaliseAcao/AnaliseAcao';
import Coluna from '../../components/ObjectsConstructors/Coluna';
import Celula from '../../components/ObjectsConstructors/Cell';
import * as actionTypes from '../../store/actions';

class Home extends Component {
	state = {
		colunas: ['Código', 'Tipo', 'Setor', 'Distribuiçao', 'Investido'],
		novaAcao: false,
		html: ''
	};

	async componentDidMount() {
		let data = await this.buscaAcoes();

		if (!this.props.dados[0]) {
			this.props.onDadosAdded(data.data.acoes);
		}
	}
	handleIcon = async event => {
		let codigo = event.currentTarget.getAttribute('data-codigo');
		await axios.delete(`/acoes/${codigo}`);
		let acoes = await axios.get('/acoes');
		this.geraDadosTabela(acoes.data.acoes);
	};
	buscaAcoes = async () => {
		if (!this.props.dados[0]) {
			let acoes = await axios.get('/acoes');
			this.geraDadosTabela(acoes.data.acoes);
			return acoes;
		} else {
			return this.props.dados;
		}
	};

	atualizaTabela = async () => {
		let data = await this.buscaAcoes();

		this.props.onDadosAdded(data.data.acoes);
	};

	clickFecha = () => {
		this.setState({ novaAcao: false });
	};

	novaAcaoHandler = () => {
		this.setState({ novaAcao: true });
	};

	abreModalAnaliseAcao = event => {
		let nomeAcao = event.target.getAttribute('data-codigo');
		console.log(nomeAcao);

		if (nomeAcao !== 'TOTAL') {
			this.setState(
				prevState =>
					(prevState.html = (
						<AnaliseAcao
							nomeAcao={nomeAcao}
							atualizaTabelaPai={this.atualizaTabela}
							show={true}></AnaliseAcao>
					))
			);
		}
	};

	geraDadosTabela = data => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});
		/////////////////////////////////////////
		/*Pega as colunas*/
		let arr2 = [];
		let totalInvestido = 0;
		this.state.colunas.forEach(element => {
			arr2.push(new Coluna(element, { tipo: 'Normal' }));
		});

		////////////////////////////////////////

		//Calcula o total
		let total = 0;
		if (data[0]) {
			total = data.reduce((acc, cV, index) => {
				if (index === 1) {
					acc = acc.Investido.vlrTotal;
				}

				return acc + cV.Investido.vlrTotal;
			});
		}

		//Empura os valores do Objeto em Array
		//BODY
		data.forEach((value, index) => {
			let distribuicao = Math.round((value.Investido.vlrTotal / total) * 100);

			let investido = value.Investido.vlrTotal;

			let key = index + 1;
			arr2[0][key] = new Celula(value.Codigo, null);
			arr2[1][key] = new Celula(value.Tipo, null);
			arr2[2][key] = new Celula(value.Setor, null);
			arr2[3][key] = new Celula(`${distribuicao} %`, null);
			arr2[4][key] = new Celula(formatter.format(investido), null);

			totalInvestido += investido;
		});

		//O FOOTER FICA AQUI MATEUS NÃO SE ESQUECÃ

		let key = Object.keys(arr2[0]).length - 1;

		arr2[0][key] = new Celula('TOTAL', {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[1][key] = new Celula('', { backgroundColor: 'black' });
		arr2[2][key] = new Celula('', { backgroundColor: 'black' });
		arr2[3][key] = new Celula('', { backgroundColor: 'black' });
		arr2[4][key] = new Celula(formatter.format(totalInvestido), {
			backgroundColor: 'black',
			color: 'white'
		});

		//////////////////////////////////////////////

		this.props.onTabelaAdded(arr2);
	};

	render() {
		return (
			<Aux>
				<Modal
					header='Nova Ação'
					show={this.state.novaAcao}
					clicked={this.clickFecha}>
					<NovaAcao />
				</Modal>
				<Tabela
					colunas={this.props.tabela}
					data={this.props.tabela}
					clicked={this.abreModalAnaliseAcao}
					icone={event => this.handleIcon(event)}
				/>
				{this.state.html}
				<div className={classes.Teste}>
					<button className={classes.NovaAcao} onClick={this.novaAcaoHandler}>
						Nova Açao
					</button>
				</div>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		dados: state.dados,
		tabela: state.tabelaHome
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onDadosAdded: dados => {
			dispatch({ type: actionTypes.ADD_DADOS, dados: dados });
		},
		onTabelaAdded: tabela => {
			dispatch({ type: actionTypes.ADD_TABELA_HOME, tabela: tabela });
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
