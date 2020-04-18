import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabela from '../../components/UI/Tabela/Tabela';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';
import Aux from '../../hof/Aux/Auxiliar';
import classes from './Home.module.css';
import NovaAcao from '../../containers/ModalNovaAcao/NovaAcao';
import AnaliseAcao from '../../containers/ModalAnaliseAcao/AnaliseAcao';
import * as actionTypes from '../../store/actions';
import { geraDadosTabelaHome } from '../../functions/geraTabelas';

class Home extends Component {
	state = {
		colunas: ['Código', 'Tipo', 'Setor', 'Distribuiçao', 'Investido'],
		novaAcao: false,
		html: '',
	};

	async componentDidMount() {
		let data = await this.buscaAcoes();

		if (!this.props.dados[0]) {
			this.props.onDadosAdded(data.data.acoes);
		}
	}
	handleIcon = async (event) => {
		let codigo = event.currentTarget.getAttribute('data-codigo');
		await axios.delete(`/acoes/${codigo}`);
		let acoes = await axios.get('/acoes');
		let tabela = geraDadosTabelaHome(acoes.data.acoes, this.state.colunas);
		this.props.onTabelaAdded(tabela);
	};
	buscaAcoes = async () => {
		let acoes = await axios.get('/acoes');
		let tabela = geraDadosTabelaHome(acoes.data.acoes, this.state.colunas);
		this.props.onTabelaAdded(tabela);
		return acoes;
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

	abreModalAnaliseAcao = (event) => {
		let nomeAcao = event.target.getAttribute('data-codigo');

		if (nomeAcao !== 'TOTAL') {
			this.setState(
				(prevState) =>
					(prevState.html = (
						<AnaliseAcao
							nomeAcao={nomeAcao}
							atualizaTabelaPai={this.atualizaTabela}
							show={true}></AnaliseAcao>
					))
			);
		}
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
					icone={(event) => this.handleIcon(event)}
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

const mapStateToProps = (state) => {
	return {
		dados: state.dados,
		tabela: state.tabelaHome,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDadosAdded: (dados) => {
			dispatch({ type: actionTypes.ADD_DADOS, dados: dados });
		},
		onTabelaAdded: (tabela) => {
			dispatch({ type: actionTypes.ADD_TABELA_HOME, tabela: tabela });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
