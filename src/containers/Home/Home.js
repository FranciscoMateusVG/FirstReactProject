import React, { Component } from 'react';
import Tabela from '../../components/UI/Tabela/Tabela';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';
import Aux from '../../hof/Aux/Auxiliar';
import classes from './Home.module.css';
import NovaAcao from '../../containers/ModalNovaAcao/NovaAcao';
import AnaliseAcao from '../../containers/ModalAnaliseAcao/AnaliseAcao';
import Coluna from '../../components/ObjectsConstructors/Coluna';

class Home extends Component {
	state = {
		dados: [],
		colunas: ['Código', 'Tipo', 'Setor', 'Distribuiçao', 'Investido'],
		novaAcao: false,
		html: '',
		tabela: []
	};

	async componentDidMount() {
		let data = await this.buscaAcoes();

		this.setState(prevState => (prevState.dados = data));

		console.log(this.state.tabela);
	}

	buscaAcoes = async () => {
		let acoes = await axios.get('/acoes');
		return this.geraDadosTabela(acoes.data.acoes);
	};

	atualizaTabela = async () => {
		let data = await this.buscaAcoes();

		this.setState(prevState => (prevState.dados = data));
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
		let arr = data.map((value, index) => {
			let distribuicao = Math.round((value.Investido.vlrTotal / total) * 100);
			let formatter = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			});
			let investido = formatter.format(value.Investido.vlrTotal);

			let key = index + 1;
			arr2[0][key] = value.Codigo;
			arr2[1][key] = value.Tipo;
			arr2[2][key] = value.Setor;
			arr2[3][key] = `${distribuicao} %`;
			arr2[4][key] = investido;

			return [
				value.Codigo,
				value.Tipo,
				value.Setor,
				`${distribuicao} %`,
				investido
			];
		});

		this.setState({ tabela: arr2 });

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
					data={this.state.dados}
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

export default Home;
