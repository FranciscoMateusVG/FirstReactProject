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

		this.props.onDadosAdded(data);
	}

	buscaAcoes = async () => {
		let acoes = await axios.get('/acoes');
		return this.geraDadosTabela(acoes.data.acoes);
	};

	atualizaTabela = async () => {
		let data = await this.buscaAcoes();

		this.props.onDadosAdded(data);
		console.log('aqui');
	};

	clickFecha = () => {
		this.setState({ novaAcao: false });
	};

	novaAcaoHandler = () => {
		this.setState({ novaAcao: true });
	};

	abreModalAnaliseAcao = event => {
		let nomeAcao = event.target.getAttribute('data');
		//console.log(event.target.getAttribute('data'));

		this.setState(
			prevState =>
				(prevState.html = (
					<AnaliseAcao
						nomeAcao={nomeAcao}
						atualizaTabelaPai={this.atualizaTabela}
						show={true}></AnaliseAcao>
				))
		);
	};

	geraDadosTabela = data => {
		/////////////////////////////////////////
		/*Pega as colunas*/
		let arr2 = [];
		this.state.colunas.forEach(element => {
			arr2.push(new Coluna(element, 'NORMAL'));
		});

		////////////////////////////////////////

		//Calcula o total
		let total = data.reduce((acc, cV, index) => {
			if (index === 1) {
				acc = acc.Investido.vlrTotal;
			}

			return acc + cV.Investido.vlrTotal;
		});

		//Empura os valores do Objeto em Array
		//BODY
		let arr = data.map((value, index) => {
			let distribuicao = Math.round((value.Investido.vlrTotal / total) * 100);
			let formatter = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			});
			let investido = formatter.format(value.Investido.vlrTotal);

			let key = index + 1;
			arr2[0][key] = new Celula( value.Codigo,null)
			arr2[1][key] = new Celula(value.Tip,null)
			arr2[2][key] = new Celula(value.Setor,null)
			arr2[3][key] = new Celula(`${distribuicao} %`,null)
			arr2[4][key] = new Celula(investido,null)

			return [
				value.Codigo,
				value.Tipo,
				value.Setor,
				`${distribuicao} %`,
				investido
			];
		});
		//O FOOTER FICA AQUI MATEUS NÃO SE ESQUECÃ

		this.props.onTabelaAdded(arr2);
		console.log(this.props.tabela);

		return arr;
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
					colunas={this.state.colunas}
					data={this.props.dados}
					clicked={this.abreModalAnaliseAcao}
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
		tabela: state.tabela
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onDadosAdded: dados => {
			dispatch({ type: actionTypes.ADD_DADOS, dados: dados });
		},
		onTabelaAdded: tabela => {
			dispatch({ type: actionTypes.ADD_TABELA, tabela: tabela });
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
